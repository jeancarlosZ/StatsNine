import { useSelector } from 'react-redux'
import store from '../index.js'
import { SET_TICKER, UPDATE_LOCAL } from '.'
import { logError } from '../../utils.js'

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
//*                              key         func             func args               save as
//*                               v           v               v       v                  v
//*  setData(await getLocalData('eps', fetchChartPrice, [DAILY, FIVE_YEAR, true], 'dailyfiveyearline'))
export async function getLocalData(key, func, args, save) {
  try {
    const state = store.getState()
    const local = state.local[save]
    //* Try to get data from local store, if it do be
    if (local) return local
    //* If not in local store, load data from API
    const loadedData = await func(state.local.ticker, ...args)
    const data = { keys: loadedData.keys, values: loadedData.values.map(x => x[key]) }
    //* Update the local store
    store.dispatch(updateLocalData(save, data))
    return data
  } catch (error) {
    logError(error, `Failed to load data! ${key}--${args}--${save}`)
  }
}
