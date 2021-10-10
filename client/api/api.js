import axios from 'axios'
import { getLocalData } from '../store/local/localActions'
import { formatDate, logError, splitProperties } from '../utils'
//* This class will contain the API methods

//* This function will return a full statement (balance, cashflow, income)
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
export async function fetchFullStatement(ticker, growth = false, period = 'annual') {
  const type = `financial-${growth ? 'growth' : 'statement-full-as-reported'}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link))
  return splitProperties(data, true)
}

//* This function will return an income statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
export async function fetchIncomeStatement(ticker, growth = false, period = 'annual') {
  const type = `income-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link))
  return splitProperties(data, true)
}

//* This function will return an balance statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
export async function fetchBalanceStatement(ticker, growth = false, period = 'annual') {
  const type = `balance-sheet-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link))
  return splitProperties(data, true)
}

//* This function will return an cashflow statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
export async function fetchCashflowStatement(ticker, growth = false, period = 'annual') {
  const type = `cash-flow-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link))
  return splitProperties(data, true)
}

//* This function will return the enterprise value for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
export async function fetchEnterpriseValue(ticker, period = 'annual') {
  const link = getFMPLink(ticker, `enterprise-values`, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link))
  return splitProperties(data, true)
}

//* This function will return discounted Cashflow from a ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set historical to true to return many years of data
export async function fetchDiscountedCashflow(ticker, hist = false, period = 'annual') {
  const type = `${hist ? 'historical-' : ''}discounted-cash-flow${hist ? '-statement' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* Historical DCF is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

//* This function will return a stock's rating/rating history
//* You can also optionally set historical to true to return many years of data
//* You can also optionally set a limit for historical data (recommended)
export async function fetchRating(ticker, hist = false, limit = 100) {
  const type = `${hist ? 'historical-' : ''}rating`
  const link = getFMPLink(ticker, type, `limit=${limit}`)
  const data = await fetchData(link)
  //* Historical is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

//* This function will return a stock's marketcap/marketcap history
//* You can also optionally set historical to true to return many years of data
//* You can also optionally set a limit for historical data (recommended)
export async function fetchMarketCap(ticker, hist = false, limit = 100) {
  const type = `${hist ? 'historical-' : ''}market-capitalization`
  const link = getFMPLink(ticker, type, `limit=${limit}`)
  const data = await fetchData(link)
  //* Historical is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

//* This function will return some key metrics relating to the stock
//* Optionally you can return TTM data which is just a single object
//* By Default it returns an annual statement, optionally 'quarter'
export async function fetchKeyMetrics(ticker, ttm = false, period = 'annual') {
  const type = `key-metrics${ttm ? '-ttm' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* TTM is time series { key, value } otherwise it's just { data }
  return ttm ? data : splitProperties(await formatTimeSeriesData(data), true)
}

//* This function will return some ratios relating to the stock
//* Optionally you can return TTM data which is just a single object
//* By Default it returns an annual statement, optionally 'quarter'
export async function fetchRatios(ticker, ttm = false, period = 'annual') {
  const type = `ratios${ttm ? '-ttm' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* TTM is time series { key, value } otherwise it's just { data }
  return ttm ? data : splitProperties(await formatTimeSeriesData(data), true)
}

//* Fetch insider trading information to see who inside the company
//* has been buying shares!
export async function fetchInsiderTrading(ticker, limit = 100) {
  const link = getFMPLink(ticker, 'insider-trading', `limit=${limit}`, false)
  const data = await fetchData(link)
  return data
}

//* This function returns the stock quote (price and volume)
//* Useful for updating ticker price without loading a ton of data
export async function fetchStockQuote(ticker) {
  const link = getFMPLink(ticker, `quote`)
  return (await fetchData(link))[0]
}

//* This function returns the stock profile, this will contain some useful info!
export async function fetchStockProfile(ticker) {
  const link = getFMPLink(ticker, `profile`)
  return (await fetchData(link))[0]
}

//* This function returns a list of the key executives at the company.
export async function fetchKeyExecutives(ticker) {
  const link = getFMPLink(ticker, `key-executives`)
  return await fetchData(link)
}

//* This function returns a list of stocks based on a search query
//* You can search by ticker or stock name (query) and Optionally
//* you can add a limit to the number of stocks returned (recommended)
export async function fetchSearchQuery(query, limit = 10) {
  //* If there is no query or it's not alphanumeric
  if (query.length <= 0 || /[^a-zA-Z0-9]/.test(query)) return {}
  const link = getFMPLink('search', '', `query=${query}&limit=${limit}`)
  return await fetchData(link)
}

//* This function returns a list of news articles/events that
//* have occured for the ticker symbols given.
//* you can add a limit to the number of stocks returned (recommended)
//* Note input format: '[ticker,ticker,ticker]' or 'ticker'
export async function fetchStockNews(query, limit = 50) {
  //* If there is no query
  if (query.length <= 0) return {}
  const searchQuery = Array.isArray(query) ? query.join() : query
  const link = getFMPLink('stock_news', '', `tickers=${searchQuery}&limit=${limit}`)
  return await fetchData(link)
}

//* This function is to be used get the list of stocks for the screener
//* Please note that in order to show the % change and other data you
//* will need to use fetchStockQuote per each ticker (unforunately)
//* Optionally you can pass in a limit to (500 is prob okay tested and it was quick)
//* You can also use filters by passing the into query.
//*
//*    Optional queries include the following:
//* ------------------------------------------------
//* marketCapMoreThan & marketCapLowerThan : Number
//* priceMoreThan & priceLowerThan : Number
//* betaMoreThan & betaLowerThan : Number
//* volumeMoreThan & volumeLowerThan : Number
//* dividendMoreThan & dividendLowerThan : Number
//* isEtf & isActivelyTrading : true/false
//* ------------------------------------------------
//* Example: 'marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0'
//* If you require help or explaination please lmk ~ brynn
export async function fetchScreenerStocks(query = '', limit = 500) {
  const link = getFMPLink('stock-screener', '', `limit=${limit}${query ? '&' + query : ''}`)
  return await fetchData(link)
}

//* Function to return stock price data, for charting the stock price
//* You can select a timeseries below
//* -----------------------------------
export const MINUTE = '1 min'
export const FIVE_MINUTE = '5 min'
export const FIFTEEN_MINUTE = '15 min'
export const THIRTY_MINUTE = '30 min'
export const HOUR = '1 hour'
export const FOUR_HOUR = '4 hour'
export const DAILY = 'Daily'
//* -----------------------------------
//* You can select a data range from those listed below as well.
//* -----------------------------------
export const WEEK = 'Week'
export const MONTH = 'Month'
export const THREE_MONTH = '3 Month'
export const SIX_MONTH = '6 Month'
export const YEAR = '1 Year'
export const FIVE_YEAR = '5 Year'
export const TEN_YEAR = '10 Year'
export const ALL = 'All'
//* -----------------------------------
//* Function to return stock price data, for charting the stock price
export async function fetchChartPrice(ticker, series = THIRTY_MINUTE, range = ALL, line = true) {
  const type = series === DAILY ? 'historical-price-full' : 'historical-chart' + `/${series}/`
  const query = `${range !== ALL ? getDataRange(range) : ''}${line ? '&serietype=line' : ''}`
  const link = getFMPLink(ticker, type, query)
  const data = await fetchData(link)
  return splitProperties(await formatTimeSeriesData(series === DAILY ? data.historical : data))
}

//* Function used to make the axios calls and return the data
async function fetchData(link) {
  try {
    const { data } = await axios.get(link)
    //! Remove (This is here so we can debug!)
    //! Remove (This is here so we can debug!)
    console.log('--------------------')
    console.log(
      'Fetching data: Try to fetch data as little as possible (once per chart/datapoint)!'
    )
    console.log('--------------------')
    console.log(link)
    console.log('--------------------')
    console.log('Data:', data)
    console.log('--------------------')
    //! Remove (This is here so we can debug!)
    //! Remove (This is here so we can debug!)
    //* Make axios call, return the data
    return data
    // return (await axios.get(link)).data
  } catch (error) {
    //* Something went wrong
    logError(error, 'Failed to make axios call for ' + link)
    return null
  }
}

//* Helper function to format the
//* response data for the reducer
export function formatTimeSeriesData(data, custom) {
  //* If the data is undefined or null
  if (!data) return {}
  //* Create our new balance sheet
  const formattedData = {}
  //* Use for loops so we can create a object
  for (let i = 0; i < data.length; i++) {
    const section = data[i]
    formattedData[custom ? section[custom] : section.date] = section
  }
  //* Return the formatted data
  return formattedData
}

//* Return the formatted link for making axios calls
export function getFMPLink(ticker, type, args, v3 = true) {
  const key = '0235b47c3f99a539c04921b8cec8ad18'
  const link = `https://financialmodelingprep.com/api/${v3 ? 'v3' : 'v4'}/`
  //* Return the desired link
  return `${link}${type}${v3 ? '/' : '?symbol='}${ticker}${v3 ? '?' : '&'}${
    args ? args + '&' : ''
  }apikey=${key}`
}

//* Used to get data range
export function getDataRange(dataRange) {
  if (dataRange === ALL) return ''

  //* This nested function will return the desired end date
  //* of the data range (so we can only return.. the range)
  const getEndDate = (current, dataRange) => {
    const endDate = new Date()
    if (dataRange === WEEK) return endDate.setDate(endDate.getDate() - 8)
    if (dataRange === MONTH) return endDate.setMonth(endDate.getMonth() - 1)
    if (dataRange === THREE_MONTH) return endDate.setMonth(endDate.getMonth() - 3)
    if (dataRange === SIX_MONTH) return endDate.setMonth(endDate.getMonth() - 6)
    if (dataRange === YEAR) return endDate.setFullYear(endDate.getFullYear() - 1)
    if (dataRange === FIVE_YEAR) return endDate.setFullYear(endDate.getFullYear() - 5)
    if (dataRange === TEN_YEAR) return endDate.setFullYear(endDate.getFullYear() - 10)
    return endDate
  }
  //* The current date (start date)
  let start = new Date()
  const end = getEndDate(start, dataRange)
  //* Return the range query
  return `from=${formatDate(end)}&to=${formatDate(start)}`
}
