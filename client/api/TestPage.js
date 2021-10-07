import React, { useEffect, useState } from 'react'
import 'simplebar/dist/simplebar.min.css'
import { fetchRating } from './api'

export default function TestPage() {
  const [data, setData] = useState({})
  //* const [balanceData, setBalanceData] = useState({})

  useEffect(() => {
    async function getData() {
      // setData(await fetchIncomeStatement('AAPL'))
      // setData(await fetchBalanceStatement('AAPL'))
      // setData(await fetchCashflowStatement('AAPL'))
      // setData(await fetchFullStatement('AAPL'))
      // setData(await fetchDiscountedCashflow('AAPL', false))
      // setData(await fetchDiscountedCashflow('AAPL', false))
      setData(await fetchRating('AAPL', true))
    }
    getData()
  }, [])

  console.log('Data:', data)

  const { keys, values } = data

  console.log('Keys:', keys)
  console.log('Values:', values)

  return <></>
}
