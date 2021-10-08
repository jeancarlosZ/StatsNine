import React, { useEffect, useState } from 'react'
import 'simplebar/dist/simplebar.min.css'
import { DAILY, fetchChartPrice, WEEK } from './api'

export default function APITestPage() {
  const [data, setData] = useState({})
  //* const [balanceData, setBalanceData] = useState({})

  useEffect(() => {
    async function getData() {
      // setData(await fetchFullStatement('AAPL'))
      // setData(await fetchIncomeStatement('AAPL'))
      // setData(await fetchBalanceStatement('AAPL'))
      // setData(await fetchCashflowStatement('AAPL'))
      // setData(await fetchEnterpriseValue('AAPL'))
      // setData(await fetchDiscountedCashflow('AAPL', false))
      // setData(await fetchRating('AAPL', true))
      // setData(await fetchMarketCap('AAPL', true))
      // setData(await fetchKeyMetrics('AAPL'))
      // setData(await fetchRatios('AAPL'))
      // setData(await fetchInsiderTrading('AAPL'))
      // setData(await fetchStockQuote('AAPL', true))
      // setData(await fetchStockProfile('AAPL'))
      // setData(await fetchKeyExecutives('AAPL'))
      // setData(await fetchSearchQuery('aap'))
      // setData(await fetchStockNews(['AAPL', 'MSFT', 'GOOG']))
      // setData(await fetchStockNews('AAPL'))
      // setData(await fetchScreenerStocks())
      // setData(await fetchChartPrice('AAPL', DAILY, WEEK))
      // setData(await fetchChartPrice('AAPL', DAILY, WEEK))
      // setData(await fetchChartPrice('AAPL', DAILY, WEEK))
    }
    getData()
  }, [])

  console.log('Data:', data)

  const { keys, values } = data

  console.log('Keys:', keys)
  console.log('Values:', values)

  return <></>
}
