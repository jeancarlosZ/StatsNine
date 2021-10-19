const axios = require('axios')
//* This class will contain the API methods

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return a full statement (balance, cashflow, income)
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
async function fetchFullStatement(ticker, growth = false, period = 'annual') {
  const type = `financial-${growth ? 'growth' : 'statement-full-as-reported'}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link), null, period === 'annual')
  return splitProperties(data, true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return an income statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
async function fetchIncomeStatement(ticker, growth = false, period = 'annual') {
  const type = `income-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link), null, period === 'annual')
  return splitProperties(data, true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return an balance statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
async function fetchBalanceStatement(ticker, growth = false, period = 'annual') {
  const type = `balance-sheet-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link), null, period === 'annual')
  return splitProperties(data, true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return an cashflow statement for the provided ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set growth to true, to only return growth
async function fetchCashflowStatement(ticker, growth = false, period = 'annual') {
  const type = `cash-flow-statement${growth ? '-growth' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link), null, period === 'annual')
  return splitProperties(data, true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return the enterprise value for the provided ticker
//* By Default it returns afn annual statement, optionally 'quarter'
async function fetchEnterpriseValue(ticker, period = 'annual') {
  const link = getFMPLink(ticker, `enterprise-values`, `period=${period}`)
  const data = formatTimeSeriesData(await fetchData(link), null, period === 'annual')
  return splitProperties(data, true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return discounted Cashflow from a ticker
//* By Default it returns an annual statement, optionally 'quarter'
//* You can also optionally set historical to true to return many years of data
async function fetchDiscountedCashflow(ticker, hist = false, period = 'annual') {
  const type = `${hist ? 'historical-' : ''}discounted-cash-flow${hist ? '-statement' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* Historical DCF is time series { key, value } otherwise it's just { data }
  return hist
    ? splitProperties(await formatTimeSeriesData(data, null, period === 'annual'), true)
    : data
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return a stock's rating/rating history
//* You can also optionally set historical to true to return many years of data
//* You can also optionally set a limit for historical data (recommended)
async function fetchRating(ticker, hist = false, limit = 100) {
  const type = `${hist ? 'historical-' : ''}rating`
  const link = getFMPLink(ticker, type, `limit=${limit}`)
  const data = await fetchData(link)
  //* Historical is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return a stock's marketcap/marketcap history
//* You can also optionally set historical to true to return many years of data
//* You can also optionally set a limit for historical data (recommended)
async function fetchMarketCap(ticker, hist = false, limit = 100) {
  const type = `${hist ? 'historical-' : ''}market-capitalization`
  const link = getFMPLink(ticker, type, `limit=${limit}`)
  const data = await fetchData(link)
  //* Historical is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return some key metrics relating to the stock
//* Optionally you can return TTM data which is just a single object
//* By Default it returns an annual statement, optionally 'quarter'
async function fetchKeyMetrics(ticker, ttm = false, period = 'annual') {
  const type = `key-metrics${ttm ? '-ttm' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* TTM is time series { key, value } otherwise it's just { data }
  return ttm
    ? data
    : splitProperties(await formatTimeSeriesData(data, null, period === 'annual'), true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function will return some ratios relating to the stock
//* Optionally you can return TTM data which is just a single object
//* By Default it returns an annual statement, optionally 'quarter'
async function fetchRatios(ticker, ttm = false, period = 'annual') {
  const type = `ratios${ttm ? '-ttm' : ''}`
  const link = getFMPLink(ticker, type, `period=${period}`)
  const data = await fetchData(link)
  //* TTM is time series { key, value } otherwise it's just { data }
  return ttm
    ? data
    : splitProperties(await formatTimeSeriesData(data, null, period === 'annual'), true)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* Fetch insider trading information to see who inside the company
//* has been buying shares!
async function fetchInsiderTrading(ticker, limit = 100) {
  const link = getFMPLink(ticker, 'insider-trading', `limit=${limit}`, false)
  const data = await fetchData(link)
  return data
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function returns the stock quote (price and volume)
//* Useful for updating ticker price without loading a ton of data
async function fetchStockQuote(ticker) {
  const link = getFMPLink(ticker, `quote`)
  return await fetchData(link)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function returns the stock profile, this will contain some useful info!
async function fetchStockProfile(ticker) {
  const link = getFMPLink(ticker, `profile`)
  return await fetchData(link)
}

/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
//* This function returns a list of the key executives at the company.
async function fetchKeyExecutives(ticker) {
  const link = getFMPLink(ticker, `key-executives`)
  return await fetchData(link)
}

//* This function returns a list of stocks based on a search query
//* You can search by ticker or stock name (query) and Optionally
//* you can add a limit to the number of stocks returned (recommended)
async function fetchSearchQuery(query, limit = 10) {
  //* If there is no query or it's not alphanumeric
  if (query.length <= 0 || /[^a-zA-Z0-9]/.test(query)) return {}
  const link = getFMPLink(
    'search',
    '',
    `query=${query}&exchange=NASDAQ,EURONEXT,XETRA,TSX,NYSE,AMEX&limit=${limit}`
  )
  return removeBlackList(await fetchData(link))
}

//* This function returns a list of news articles/events that
//* have occured for the ticker symbols given.
//* you can add a limit to the number of stocks returned (recommended)
//* Note input format: '[ticker,ticker,ticker]' or 'ticker'
async function fetchStockNews(query = '', limit = 50, manualQuery = false) {
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
async function fetchScreenerStocks(query = '', limit = 5000) {
  const link = getFMPLink(
    'stock-screener',
    '',
    `${limit !== -1 ? `exchange=NASDAQ&limit=${limit}` : ''}${query ? '&' + query : ''}`
  )
  return await fetchData(link)
}

//* Function to return stock price data, for charting the stock price
//* You can select a timeseries below
//* -----------------------------------
const MINUTE = '1 min'
const FIVE_MINUTE = '5 min'
const FIFTEEN_MINUTE = '15 min'
const THIRTY_MINUTE = '30 min'
const HOUR = '1 hour'
const FOUR_HOUR = '4 hour'
const DAILY = 'Daily'
//* -----------------------------------
//* You can select a data range from those listed below as well.
//* -----------------------------------
const WEEK = 'Week'
const MONTH = 'Month'
const THREE_MONTH = '3 Month'
const SIX_MONTH = '6 Month'
const YEAR = '1 Year'
const FIVE_YEAR = '5 Year'
const TEN_YEAR = '10 Year'
const ALL = 'All'
//* -----------------------------------
//* Function to return stock price data, for charting the stock price
/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
async function fetchChartPrice(ticker, series = THIRTY_MINUTE, range = ALL, line = true) {
  const type = series === DAILY ? 'historical-price-full' : 'historical-chart' + `/${series}/`
  const query = `${range !== ALL ? getDataRange(range) : ''}${line ? '&serietype=line' : ''}`
  const link = getFMPLink(ticker, type, query)
  const data = await fetchData(link)
  return splitProperties(
    await formatTimeSeriesData(series === DAILY ? data.historical : data, null, false)
  )
}

//* Function used to make the axios calls and return the data
async function fetchData(link) {
  try {
    //* Make axios call, return the data
    return (await axios.get(link)).data
  } catch (error) {
    //* Something went wrong
    return null
  }
}

//* Helper function to format the
//* response data for the reducer
function formatTimeSeriesData(data, custom, doFix = true) {
  //* If the data is undefined or null
  if (!data) return {}
  const years = {}
  //* Create our new balance sheet
  const formattedData = {}
  //* Use for loops so we can create a object
  for (let i = 0; i < data.length; i++) {
    const section = data[i]
    const ogDate = custom ? section[custom] : section.date
    if (doFix) {
      const year = formatDate(ogDate, true)
      if (!years[year]) formattedData[ogDate] = section
      years[year] = true
    } else formattedData[ogDate] = section
  }

  //* Return the formatted data
  return formattedData
}

//* Return the formatted link for making axios calls
function getFMPLink(ticker, type, args, v3 = true) {
  const key = '0235b47c3f99a539c04921b8cec8ad18'
  const link = `https://financialmodelingprep.com/api/${v3 ? 'v3' : 'v4'}/`
  //* Return the desired link
  return `${link}${type}${v3 ? '/' : '?symbol='}${ticker}${v3 ? '?' : '&'}${
    args ? args + '&' : ''
  }apikey=${key}`
}

//* Used to get data range
function getDataRange(dataRange) {
  if (dataRange === ALL) return ''

  //* This nested function will return the desired end date
  //* of the data range (so we can only return.. the range)
  const getEndDate = (current, dataRange) => {
    const endDate = new Date()
    if (dataRange === WEEK) return endDate.setDate(endDate.getDate() - 9)
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

//* Format dates for charting
function formatDate(date, years = false) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return years ? year : [year, month, day].join('-')
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
  return data.filter(x => !blackList[x.symbol])
}

//* Split an object into two arrays, keys and values
//* You can optionally return the array values in reverse.
//* Which is useful when dealing with time series data.
function splitProperties(obj, reverse = false) {
  //* If object is null or undefined
  //* then there's no properties
  if (!obj) return null
  try {
    //* Obtain the keys
    let keys = Object.keys(obj)
    //* Obtain the values by mapping the keys
    let values = Object.values(obj)

    //* If they should be reversed
    if (reverse) {
      keys = keys.reverse()
      values = values.reverse()
    }

    //* Return the keys and values
    return { keys, values }
  } catch (error) {
    //* If the object doesn't have any properties
    //* we will get an error and return null as a backup
    return null
  }
}

module.exports = {
  fetchFullStatement,
  fetchIncomeStatement,
  fetchBalanceStatement,
  fetchCashflowStatement,
  fetchDiscountedCashflow,
  fetchEnterpriseValue,
  fetchInsiderTrading,
  fetchKeyExecutives,
  fetchKeyMetrics,
  fetchMarketCap,
  fetchRating,
  fetchRatios,
  fetchStockProfile,
  fetchStockQuote,
  fetchChartPrice,
  fetchSearchQuery,
  fetchStockNews,
  fetchScreenerStocks,
  removeBlackList,
  MINUTE,
  FIVE_MINUTE,
  FIFTEEN_MINUTE,
  THIRTY_MINUTE,
  HOUR,
  FOUR_HOUR,
  DAILY,
  WEEK,
  MONTH,
  THREE_MONTH,
  SIX_MONTH,
  YEAR,
  FIVE_YEAR,
  TEN_YEAR,
  ALL
}
