import { useSelector } from 'react-redux'
import store from '../index.js'
import { SET_TICKER, UPDATE_LOCAL } from '.'
import { logError } from '../../utils.js'
import { load } from 'cheerio'
import {
  fetchBalanceStatement,
  fetchCashflowStatement,
  fetchEnterpriseValue,
  fetchIncomeStatement,
  fetchKeyMetrics,
  fetchRatios
} from '../../api/api.js'

//* This will update the ticker symbol (the chosen stock)
//* This should be changed when the search/select a stock to view.
export function setTickerSymbol(ticker) {
  return {
    type: SET_TICKER,
    payload: ticker
  }
}

//* This func will update the local data.
function updateLocalData(key, data) {
  return {
    type: UPDATE_LOCAL,
    key: key,
    payload: data
  }
}

//* This function is to help optimize API calls,
//* the concept is that you will save individual key: value
//* pairs here so you don't need to fetch as much.
//* Examples below:
//*                              key         func             func args         save as
//*                               v           v               v       v            v
//*  setData(await getLocalData('eps', fetchFullStatement, [false, 'annual'], 'epsannual'))
//*
//*  you can also load multiple         keys                    func             func args             save []
//*                                      v                       v               v       v               v
//*  setData(await getLocalData(['assets, liabilities'], fetchFullStatement, [false, 'annual'], ['assetsannual, liabilitiesannual']))
//*
//*  ---> (LOOK BELOW AND FIND THE getTickerResults() FOR USE CASES) <---
//*
export async function getLocalData(key, func, args, save) {
  try {
    const state = store.getState()
    //* If we are selecting data in batch
    if (Array.isArray(save)) {
      //* Both must be arrays, and same length
      if (!Array.isArray(key) || save.length !== key.length) return
      const data = {}
      const toLoad = []

      //* Map over the keys we're looking for
      key.map((k, index) => {
        //* Try to get data from local store, if it do be
        const local = state.local[save[index]]
        //* If it is we add it to the obj
        if (local) data[k] = local
        //* Otherwise we add the data to be loaded
        else toLoad.push({ a: k, b: save[index] })
      })

      //* Load the data from the API
      const loadedData = await func(state.local.ticker, ...args)

      //* Now we must load all of the data that wasn't already
      //* saved within the state
      toLoad.map(pair => {
        const { a, b } = pair
        let individualData

        if (!Array.isArray(loadedData))
          individualData = {
            keys: loadedData.keys,
            values: loadedData.values.map(x => x[a])
          }
        else if (Array.isArray(loadedData)) individualData = loadedData[0][a]
        else individualData = loadedData[a]

        data[a] = individualData
        //* Update the local store
        store.dispatch(updateLocalData(b, individualData))
      })

      return data
      //* Otherwise we can return the single peice of data
    } else return await handleLocalData(state, save, func, args, key)
  } catch (error) {
    logError(error, `Failed to load data! ${key}--${args}--${save}`)
  }
}

//* Function to handle loading a single peice of data from local/API
async function handleLocalData(state, save, func, args, key) {
  const local = state.local[save]
  //* Try to get data from local store, if it do be
  if (local) return local
  //* If not in local store, load data from API
  const loadedData = await func(state.local.ticker, ...args)
  let data
  //* Because data may not be time series data we must add a check
  if (!Array.isArray(loadedData))
    data = { keys: loadedData.keys, values: loadedData.values.map(x => x[key]) }
  else if (Array.isArray(loadedData)) data = loadedData[0][key]
  else data = loadedData[key]
  //* Update the local store
  store.dispatch(updateLocalData(save, data))
  return data
}

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

export const GOOD = 'GOOD'
export const BAD = 'BAD'
export const OKAY = 'OKAY'

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
  const state = store.getState()
  const local = state.local.results
  //* Check to see if we have already saved this info
  if (local) return local

  const { totalAssets, totalLiabilities } = await getLocalData(
    ['totalAssets', 'totalLiabilities'],
    fetchBalanceStatement,
    [false, 'annual'],
    ['assetsannual', 'liabilitiesannual']
  )
  const { freeCashFlow, netIncome } = await getLocalData(
    ['freeCashFlow', 'netIncome'],
    fetchCashflowStatement,
    [false, 'annual'],
    ['fcfannual', 'netincomeannual']
  )
  const revenue = await getLocalData(
    'revenue',
    fetchIncomeStatement,
    [false, 'annual'],
    'revenueannual'
  )
  const roicTTM = await getLocalData('roicTTM', fetchKeyMetrics, [true], 'roicTTM')
  const numberOfShares = await getLocalData(
    'numberOfShares',
    fetchEnterpriseValue,
    ['annual'],
    'sharesannual'
  )
  const { priceEarningsRatio, priceToFreeCashFlowsRatio } = await getLocalData(
    ['priceEarningsRatio', 'priceToFreeCashFlowsRatio'],
    fetchRatios,
    [false, 'annual'],
    ['peannual', 'pfcfannual']
  )

  //* Five year avg PE
  const avgPe = priceEarningsRatio.values.slice(-5).reduce((prev, curr) => prev + curr, 0) / 5
  //* Five year P/FCF
  const avgfcf =
    priceToFreeCashFlowsRatio.values.slice(-5).reduce((prev, curr) => prev + curr, 0) / 5
  //* 5y Revenue growth
  const revg = revenue.values.slice(-5)
  //* 5y Cashflow growth
  const cashg = freeCashFlow.values.slice(-5)
  //* 5y Net income growth
  const netg = netIncome.values.slice(-5)
  //* 5y shares decreasing
  const shareg = numberOfShares.values.slice(-5)
  //* 5y avg cashflow
  const avgcash = cashg.reduce((prev, curr) => prev + curr, 0) / 5
  //* LTL / 5 yr avg cashflow ^
  const ltlyears = totalLiabilities.values.slice(-1) / avgcash

  const results = {
    pe: avgPe >= 22.5 ? BAD : avgPe <= 20 ? GOOD : OKAY,
    pfcf: avgfcf >= 22.5 ? BAD : avgfcf <= 20 ? GOOD : OKAY,
    revgrowth: revg[0] < revg[revg.length - 1] ? GOOD : BAD,
    cashgrowth: cashg[0] < cashg[cashg.length - 1] ? GOOD : BAD,
    netincome: netg[0] < netg[netg.length - 1] ? GOOD : BAD,
    roic: roicTTM >= 0.1 ? GOOD : roicTTM <= 0.08 ? BAD : OKAY,
    shares: shareg[0] > shareg[shareg.length - 1] ? GOOD : BAD,
    assets: totalAssets.values.slice(-1) > totalLiabilities.values.slice(-1) ? GOOD : BAD,
    ltl: ltlyears <= 5 ? GOOD : ltlyears > 6.5 ? BAD : OKAY
  }
  store.dispatch(updateLocalData('results', results))
  return results
}
