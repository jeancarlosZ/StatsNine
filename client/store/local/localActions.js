import { useSelector } from 'react-redux'
import store from '../index.js'
import { SET_TICKER, UPDATE_LOCAL } from '.'
import { logError } from '../../utils.js'
import { load } from 'cheerio'

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
//*  ---> (LOOK AT api.js AND FIND THE getTickerResults() FOR USE CASES) <---
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
          individualData = { keys: loadedData.keys, values: loadedData.values.map(x => x[key]) }
        else if (Array.isArray(loadedData)) individualData = loadedData[0][key]
        else individualData = loadedData[key]

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

  //! Remove
  console.log('--------------------')
  console.log('save:', save)
  console.log('loadedData:', loadedData)
  console.log('--------------------')
  //! Remove

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
