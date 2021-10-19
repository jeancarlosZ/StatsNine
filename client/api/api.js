import axios from 'axios'
import { formatDate, logError, splitProperties } from '../utils'
//* This class will contain the API methods

//* This function returns a list of stocks based on a search query
//* You can search by ticker or stock name (query) and Optionally
//* you can add a limit to the number of stocks returned (recommended)
export async function fetchSearchQuery(query, limit = 10, restrict = false) {
  //* If there is no query or it's not alphanumeric
  if (query.length <= 0 || /[^a-zA-Z0-9]/.test(query)) return {}
  const link = getFMPLink(
    'search-ticker',
    '',
    `query=${query}${
      restrict ? '&exchange=NASDAQ,EURONEXT,XETRA,TSX,NYSE,AMEX' : ''
    }&limit=${limit}`
  )
  return removeBlackList(await fetchData(link))
}

//* This function returns a list of news articles/events that
//* have occured for the ticker symbols given.
//* you can add a limit to the number of stocks returned (recommended)
//* Note input format: '[ticker,ticker,ticker]' or 'ticker'
export async function fetchStockNews(query = '', limit = 50, manualQuery = false) {
  const searchQuery = Array.isArray(query) ? query.join() : query
  const queryStr = manualQuery ? query : `tickers=${searchQuery}`
  const link = getFMPLink('stock_news', '', `${queryStr}&limit=${limit}`)
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
  const link = getFMPLink(
    'stock-screener',
    '',
    `exchange=NASDAQ&limit=${limit}${query ? '&' + query : ''}`
  )
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
/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
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
    //* Make axios call, return the data
    return (await axios.get(link)).data
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

  const dates = []

  //* Create our new balance sheet
  const formattedData = {}
  //* Use for loops so we can create a object
  for (let i = 0; i < data.length; i++) {
    const section = data[i]
    formattedData[custom ? section[custom] : section.date] = section
    dates.push(formatDate(custom ? section[custom] : section.date, true))
  }

  //* Return the formatted data
  return formattedData
}

//* Return the formatted link for making axios calls
export function getFMPLink(ticker, type, args, v3 = true) {
  const key = '0235b47c3f99a539c04921b8cec8ad18'
  const link = `https://financialmodelingprep.com/api/${v3 ? 'v3' : 'v4'}`
  //* Return the desired link
  return `${link}${type ? '/' + type : ''}${v3 ? '/' : '?symbol='}${ticker}${v3 ? '?' : '&'}${
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
    if (dataRange === WEEK) return endDate.setDate(endDate.getDate() - 7)
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

const blackList = {
  BTC: true,
  'QBTC.TO': true,
  FOREX: true,
  MUTUAL_FUND: true,
  CRYPTO: true,
  BLTS: true,
  BLTSU: true,
  BLTSW: true,
  SSPGX: true,
  ASPCW: true,
  POWRW: true,
  HCICW: true,
  SWETW: true,
  TBCPW: true,
  ZWRKW: true,
  AUUDW: true,
  ENFAW: true,
  SDVGX: true,
  GTPBW: true,
  SRNGW: true,
  MXAPX: true
}

//* Remove blacklisted stocks from the queue/return
function removeBlackList(data) {
  return data.filter(x => {
    if (!blackList[x.symbol] && !blackList[x.exchangeShortName]) return true
  })
}
