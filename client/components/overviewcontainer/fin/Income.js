import React, { useState, useEffect } from 'react'
import UniversalChart from '../../UniversalChart'
import { Price } from '../PriceChart'
import FinTable from './FinTable'
import CompanyInfo from './CompanyInfo'
import { fetchIncomeStatement, fetchStockProfile } from '../../../api/api'
import { useSelector } from 'react-redux'
import {
  returnProfile,
  returnTableInfo,
  calcYearlyChanges,
  formatNestedArrayNums,
  getDates
} from './finUtils'
import { FinButtons } from './FinButtons'

//Right now I'm fetching from API at every sub page
//That's not what we want and I'll be optimizing with some of the tools we have
export default function Income() {
  const { symbol } = useSelector(state => state.local)
  const [incomeInfo, setIncomeInfo] = useState({})
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function getIncomeInfo() {
      setIncomeInfo(await fetchIncomeStatement(symbol))
      setProfile(await fetchStockProfile(symbol))
    }
    getIncomeInfo()
  }, [])

  const companyProfile = returnProfile(profile)

  //These are the values returned from the fetch. Can be used in our charts!
  const { values } = incomeInfo

  //Labels for Financials Tables
  //Right now formatting the labels and using them to fetch
  //Empty string is for date
  const labels = [
    'Gross Profit',
    'Operating Expenses',
    'Operating Income',
    'Income Before Tax',
    'Income Tax Expense'
  ]

  //Returning a 2D array
  //Every inner array is a row of info relating to the above labels
  const unformatedDataNums = values ? returnTableInfo(values, labels) : []

  const dates = values ? getDates(values) : []
  const infoArray = formatNestedArrayNums(unformatedDataNums)
  const yearlyChanges = calcYearlyChanges(unformatedDataNums)

  //This is for our Chart information
  //Generate the data set and pass it into UniversalChart which is already in the return statement
  //Right now it's all place holder data
  const dataset = []

  dataset.push({
    name: 'Income',
    type: 'scatter',
    labels: ['1st', '2nd', '3rd', '4th', '5th'],
    values: [38, 27, 18, 10, 7],
    hoverinfo: 'label+percent+name',
    domain: { row: 1, column: 0 }
  })

  return (
    <React.Fragment>
      <div className="income-container flex-row justify-between">
        <CompanyInfo
          companyName={companyProfile.companyName}
          symbol={companyProfile.symbol}
          ticker={companyProfile.exchangeShortName}
        />
        <div className="fin-chart-container">
          <UniversalChart
            className="income-chart fin-chart"
            title="Net Income"
            dataset={dataset}
            showlegend={false}
          />
        </div>
      </div>
      <FinButtons />
      {values ? (
        <FinTable dates={dates} rowInfo={infoArray} yearlyChanges={yearlyChanges} labels={labels} />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </React.Fragment>
  )
}
