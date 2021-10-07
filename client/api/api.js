import axios from 'axios'
import { logError, splitProperties } from '../utils'
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
  //* Historical DCF is time series { key, value } otherwise it's just { data }
  return hist ? splitProperties(await formatTimeSeriesData(data), true) : data
}

//* Function used to make the axios calls and return the data
async function fetchData(link) {
  try {
    //* Make axios call, return the data
    return (await axios.get(link)).data
  } catch (error) {
    //* Something went wrong
    logError(error, 'Failed to make axios call for' + link)
    return null
  }
}

//* Helper function to format the
//* response data for the reducer
export function formatTimeSeriesData(data) {
  //* If the data is undefined or null
  if (!data) return {}
  //* Create our new balance sheet
  const formattedData = {}
  //* Use for loops so we can create a object
  for (let i = 0; i < data.length; i++) {
    const section = data[i]
    formattedData[section.date] = section
  }
  //* Return the formatted data
  return formattedData
}

//* Return the formatted link for making axios calls
export function getFMPLink(ticker, type, args) {
  const key = '0235b47c3f99a539c04921b8cec8ad18'
  const link = 'https://financialmodelingprep.com/api/v3/'
  //* Return the desired link
  return `${link}${type}/${ticker}?${args ? args + '&' : ''}apikey=${key}`
}

//*   FINANCIAL STATEMENTS
//* 'key-metrics-ttm'
//* 'key-metrics'

//* 'ratios-ttm'
//* 'ratios'

//* 'enterprise-values'

//*
//*   COMPANY INFORMATION
//* 'profile'
//* 'key-executives'
//*
//* 'earning_calendar'
//* 'market-capitalization'
//* 'historical-market-capitalization'
//*
//*   SEARCH STOCKS
//* 'search?query=${query}&limit=10&exchange=NASDAQ'
//*
//*   STOCK SCREENER
//* 'stock-screener' // marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100
//*
//*   STOCK NEWS
//* 'stock_news?tickers=AAPL,FB,GOOG,AMZN&limit=50&'
//*
//* 'insider-trading?symbol=AAPL&limit=100'
//*
//*   STOCK PRICE
//* 'quote'
//* 'quote-short'
//* 'historical-chart'/'1min''5min''15min''30min''1hour''4hour'
