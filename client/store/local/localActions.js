import axios from "axios";
import { SET_TICKER, UPDATE_LOCAL } from ".";
import { logError } from "../../utils.js";
import store from "../index.js";

//* This will update the ticker symbol (the chosen stock)
//* This should be changed when the search/select a stock to view.
//* UPDATE: Made change to allow for stock.name
export function setCurrentStock(symbol, companyName) {
  window.localStorage.setItem("symbol", symbol);
  return {
    type: SET_TICKER,
    payload: getPayload(symbol, companyName),
  };
}

//* Func to get the payload for above!
function getPayload(symbol, companyName) {
  if (companyName) return { symbol: symbol, companyName: companyName };
  return { symbol: symbol };
}

//* This func will update the local data.
function updateLocalData(key, data) {
  return {
    type: UPDATE_LOCAL,
    key: key,
    payload: data,
  };
}

//* This function is to help optimize API calls,
//* the concept is that you will save individual key: value
//* pairs here so you don't need to fetch as much.
//* Examples below:
//*                              key         func             func args         save as
//*                               v           v               v       v            v
//*  setData(await getLocalData('eps', 'fetchFullStatement', [false, 'annual'], 'epsannual'))
//*
//*  you can also load multiple         keys                    func             func args             save []
//*                                      v                       v               v       v               v
//*  setData(await getLocalData(['assets, liabilities'], 'fetchFullStatement', [false, 'annual'], ['assetsannual, liabilitiesannual']))
//*
//*  ---> (LOOK BELOW AND FIND THE getTickerResults() FOR USE CASES) <---
//*
export async function getLocalData(
  key,
  func,
  args,
  saveAs,
  overrideTicker,
  experation = 300,
) {
  try {
    //* Get our state
    const state = store.getState();
    //* We load our selected ticker from state (unless it's overridden)
    const symbol = overrideTicker ? overrideTicker : state.local.symbol;
    //* Since redis is backend, we need to send the
    //* data thru the request.body so we will create
    //* That request body now.
    const body = {
      symbol: symbol,
      //* This is the key or keys list
      key: key,
      //* This is the saveAs or saveAs list
      saveAs: saveAs,
      //* Functions can't be sent thru, so we use the func name
      callback: func,
      //* Arguments to place inside the function on the backend
      args: args,
      //* If you desire you can set a time limit for the
      //* data to stay in the system!
      experation: experation,
    };
    //* Now we will request the data from redis!
    const { data } = await axios.post("/api/data", body);
    return data;
  } catch (error) {
    logError(error, `Failed to load data! ${key}--${args}--${saveAs}`);
  }
}

//* This function will return the data we need to create a detailed stock screener page!
//* By default this function will return the top 500 NASDAQ stocks and store them for 60 seconds.
export async function getScreenerData(
  params = "",
  quantity = 500,
  experation = 60,
) {
  try {
    //* That request body now.
    const body = {
      //* Quantity of screener stocks to load
      quantity: quantity,
      //* How long the screener data will persist!
      experation: experation,
      //* This is the saveAs or saveAs list
      params: params,
    };
    //* Now we will request the data from redis!
    const { data } = await axios.post("/api/data/screener", body);
    return data;
  } catch (error) {
    logError(error, `Failed to load the screener data`);
  }
}

export async function getSearchQuery(query, limit = 10, restrict = false) {
  try {
    const body = { query, limit, restrict };
    const { data } = await axios.post("/api/data/searchQuery", body);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getStockNews(
  query = "",
  limit = 50,
  manualQuery = false,
) {
  try {
    const body = { query, limit, manualQuery };
    const { data } = await axios.post("/api/data/stockNews", body);
    return data;
  } catch (err) {
    console.error(err);
  }
}

//* --------------------------------------------------------------------------
//* This is the old way of doing things this stored the data inside Redux
//* before we started storing it in redis!
//* --------------------------------------------------------------------------
// export async function getLocalData(key, func, args, save, overrideTicker) {
//   try {
//     const state = store.getState()
//     const symbol = overrideTicker ? overrideTicker : state.local.symbol

//     //* If we are selecting data in batch or an [] of data
//     if (Array.isArray(save)) {
//       //* Both must be arrays, and same length
//       if (!Array.isArray(key) || save.length !== key.length) return
//       const data = {}
//       const toLoad = []

//       //* Map over the keys we're looking for
//       key.map((k, index) => {
//         //* Try to get data from local store, if it do be
//         const local = state.local[save[index]]

//         //* If it is we add it to the obj
//         if (local) data[k] = local
//         //* Otherwise we add the data to be loaded
//         else toLoad.push({ a: k, b: save[index] })
//       })

//       //* If there is actually any data we need to load!
//       if (toLoad.length > 0) {
//         //* Load the data from the API
//         const loadedData = args ? await func(symbol, ...args) : await func(symbol)
//         //* Now we must load all of the data that wasn't already
//         //* saved within the state
//         toLoad.map(pair => {
//           const { a, b } = pair
//           let individualData

//           if (!Array.isArray(loadedData))
//             individualData = {
//               keys: loadedData.keys,
//               values: loadedData.values.map(x => x[a])
//             }
//           else if (Array.isArray(loadedData)) individualData = loadedData[0][a]
//           else individualData = loadedData[a]

//           data[a] = individualData
//           //* Update the local store
//           store.dispatch(updateLocalData(b, individualData))
//         })
//       }

//       return data
//       //* Otherwise we can return the single peice of data
//     } else return await handleLocalData(state, save, func, args, key, symbol)
//   } catch (error) {
//     logError(error, `Failed to load data! ${key}--${args}--${save}`)
//   }
// }

// //* Function to handle loading a single peice of data from local/API
// async function handleLocalData(state, save, func, args, key, overrideTicker) {
//   const local = state.local[save]
//   //* Try to get data from local store, if it do be
//   if (local) return local
//   //* If not in local store, load data from API  // (ticker, false, 'quarter')
//   const loadedData = args ? await func(overrideTicker, ...args) : await func(overrideTicker)
//   let data
//   //* Because data may not be time series data we must add a check
//   if (!Array.isArray(loadedData))
//     data = { keys: loadedData.keys, values: loadedData.values.map(x => x[key]) }
//   else if (Array.isArray(loadedData)) data = loadedData[0][key]
//   else data = loadedData[key]
//   //* Update the local store
//   store.dispatch(updateLocalData(save, data))
//   return data
// }

//* If you are wondering what the benefits of the above functions are.
//* They are as follows
//*   - Less API calls to load the same amount of data
//*   - Allows for cache data storage so if a user swaps tabs, it will not reload the data
//*   - Faster user experience, after first data load, it can be used accross the program
//*      - This means if they load say.. Chart data on the overview page, that same data will
//*        already be loaded for the keyMetrics page!
//*   - 1 Method, can load multiple data sets! (see usage below)
//*
//*             create your variables
//*             v       v           v
//* const { assets, liabilities, commonstocksharesoutstanding } = await getLocalData(
//*   ['assets', 'liabilities', 'commonstocksharesoutstanding'],                        <- choose the 'keys' to load from the data
//*   fetchFullStatement,                                                               <- choose what function should be called
//*   [false, 'annual'],                                                                <- what arguments should that function use
//*   ['assetsannual', 'liabilitiesannual', 'sharesannual']                             <- name they should be saved under in cache
//* )                                                                                       (should be universal/standard)
//*           ^                  ^              ^
//* since we're loading annual data, I would title them accordingly
//* if this was quarterly it would look something like this
//* ['assetsquarter', 'liabilitiesquarter', 'sharesquarter']
//*
//* IF YOU DO NOT UNDERSTAND HOW TO USE THIS FUNC PLEASE LET ME KNOW ~ BRYNN

export const GOOD = "GOOD";
export const BAD = "BAD";
export const OKAY = "OKAY";

//* Calculate chosen tickers Key Metrics results, and return them (for coloring stars)
//*
//* const exampleResults = {
//*   pe: [good/bad/okay],
//*   pfcf: [good/bad/okay],
//*   revgrowth: [good/bad/okay],
//*   cashgrowth: [good/bad/okay],
//*   netincome: [good/bad/okay],
//*   roic: [good/bad/okay],
//*   shares: [good/bad/okay],
//*   assets: [good/bad/okay],
//*   ltl: [good/bad/okay]
//* }
export async function getTickerResults() {
  const state = store.getState();
  const local = state.local.results;
  //* Check to see if we have already saved this info
  if (local) return local;

  const { totalAssets, totalLiabilities, totalInvestments } =
    await getLocalData(
      ["totalAssets", "totalLiabilities", "totalInvestments"],
      "fetchBalanceStatement",
      [false, "annual"],
      ["assetsannual", "liabilitiesannual", "investmentsannual"],
    );
  const { freeCashFlow, netIncome } = await getLocalData(
    ["freeCashFlow", "netIncome"],
    "fetchCashflowStatement",
    [false, "annual"],
    ["fcfannual", "netincomeannual"],
  );
  const revenue = await getLocalData(
    "revenue",
    "fetchIncomeStatement",
    [false, "annual"],
    "revenueannual",
  );
  // const roicTTM = await getLocalData('roicTTM', fetchKeyMetrics, [true], 'roicTTM')
  const { numberOfShares, marketCapitalization } = await getLocalData(
    ["numberOfShares", "marketCapitalization"],
    "fetchEnterpriseValue",
    ["annual"],
    ["sharesannual", "marketcapannual"],
  );
  const effectiveTaxRate = await getLocalData(
    "effectiveTaxRate",
    "fetchRatios",
    [false, "annual"],
    "taxannual",
  );
  // TODO:
  //* Five year avg PE
  // const avgPe = priceEarningsRatio.values.slice(-5).reduce((prev, curr) => prev + curr, 0) / 5
  //* Five year P/FCF
  // const avgfcf = priceToFreeCashFlowsRatio.values.slice(-5).reduce((prev, curr) => prev + curr, 0) / 5
  const marketCaps = marketCapitalization.values;
  const currentCap =
    marketCaps.slice(-1).pop() !== 0
      ? marketCaps.slice(-1).pop()
      : marketCaps.slice(-2)[0];
  const cashg = freeCashFlow.values.slice(-5);

  const avgcash = cashg.reduce((prev, curr) => prev + curr, 0) / 5;
  const netg = netIncome.values.slice(-5);
  const avgE = netg.reduce((prev, curr) => prev + curr, 0) / 5;

  const avgPe = currentCap / avgE;
  const avgfcf = currentCap / avgcash;

  const revg = revenue.values.slice(-5);
  const shareg = numberOfShares.values.slice(-5);
  const currentLiabilities = [...totalLiabilities.values].pop();
  const ltlyears = avgcash >= 1 ? currentLiabilities / avgcash : -1;
  const investedCap = totalInvestments.values.slice(-5);
  const taxes = effectiveTaxRate.values.slice(-5);

  //* Correct formula for ROIC!! account for taxes and negitive's
  const roics = [...netg].map((n, i) => {
    const result = (n * (1 - taxes[i])) / investedCap[i];
    return Math.abs(result) == Infinity || isNaN(result) ? 0 : result;
  });
  //* Get the average ROIC
  const roicAvg = roics.reduce((prev, curr) => prev + curr) / 5;

  const results = {
    symbol: state.local.symbol,
    pe: avgPe <= 0 ? BAD : avgPe >= 22.5 ? BAD : avgPe <= 20 ? GOOD : OKAY,
    pedata: avgPe,
    pfcf: avgfcf <= 0 ? BAD : avgfcf >= 22.5 ? BAD : avgfcf <= 20 ? GOOD : OKAY,
    pfcfdata: avgfcf,
    revgrowth: revg[0] < revg[revg.length - 1] ? GOOD : BAD,
    revgrowthdata: { k: revenue.keys.slice(-5), v: revg },
    cashgrowth: cashg[0] < cashg[cashg.length - 1] ? GOOD : BAD,
    cashgrowthdata: { k: freeCashFlow.keys.slice(-5), v: cashg },
    netincome: netg[0] < netg[netg.length - 1] ? GOOD : BAD,
    netincomedata: { k: netIncome.keys.slice(-5), v: netg },
    roic: roicAvg >= 0.1 ? GOOD : roicAvg <= 0.08 ? BAD : OKAY,
    roicdata: { avg: roicAvg, vals: { k: netIncome.keys.slice(-5), v: roics } },
    shares: shareg[0] > shareg[shareg.length - 1] ? GOOD : BAD,
    sharesdata: { k: numberOfShares.keys.slice(-5), v: shareg },
    assets:
      [...totalAssets.values].pop() > [...totalLiabilities.values].pop()
        ? GOOD
        : BAD,
    assetsdata: {
      k: totalAssets.keys.slice(-5),
      a: totalAssets.values.slice(-5),
      b: totalLiabilities.values.slice(-5),
    },
    ltl:
      ltlyears === -1
        ? BAD
        : ltlyears <= 5
        ? GOOD
        : ltlyears > 6.5
        ? BAD
        : OKAY,
    ltldata: { years: ltlyears, avg: avgcash, libs: currentLiabilities },
  };

  //* Calcuate the stock's score!
  const score = Math.ceil(
    getPoints("pe") +
      getPoints("pfcf") +
      getPoints("revgrowth") +
      getPoints("cashgrowth") +
      getPoints("netincome") +
      getPoints("roic") +
      getPoints("shares") +
      getPoints("assets") +
      getPoints("ltl"),
  );

  results.score = score;

  function getPoints(type) {
    const result = results[type];
    return result === GOOD ? 11.11 : result === BAD ? 0 : 5.55;
  }

  store.dispatch(updateLocalData("results", results));
  return results;
}

//* This function is used to load a stocks profile, THIS SHOULD ONLY BE CALLED ONCE!
//* You should be using getLocalData() to load each thing you need!
export async function loadStockProfile() {
  const state = store.getState();
  const local = state.local.profile;
  //* Check to see if this has already been loaded
  //* The stock profile data, should only be loaded once!
  if (local) return;
  const profile = await getLocalData(
    [
      "price",
      "beta",
      "volAvg",
      "mktCap",
      "lastDiv",
      "companyName",
      "industry",
      "website",
      "description",
      "ceo",
      "sector",
      "fullTimeEmployees",
      "dcf",
      "image",
      "ipoDate",
    ],
    "fetchStockProfile",
    [],
    [
      "price",
      "beta",
      "volAvg",
      "mktCap",
      "lastDiv",
      "companyName",
      "industry",
      "website",
      "description",
      "ceo",
      "sector",
      "fullTimeEmployees",
      "dcf",
      "image",
      "ipoDate",
    ],
  );
  //* Set profile loaded to true
  store.dispatch(updateLocalData("profile", true));

  return profile;
}
