import React, { useEffect, useState } from 'react'
import { getLocalData } from '../../../store/local/localActions'
import UniversalChart from '../../UniversalChart'
import CompanyInfo from './CompanyInfo'
import { FinButtons } from './FinButtons'
import FinTable from './FinTable'
import { enterpriseIndentifiers, enterpriseTableLabels, getQtrIndentifers } from './finTableLabels'
import { formatDates, processUnformattedData, returnUnformatedData } from './finUtils'

//Using the getLocalData method
//This method first checks to see if the requested data is in our redux store. If it is, return it, otherwise fetch what we need and log
//that into the local component sate and redux state

export default function EnterpriseValue() {
  const [selectedAttribute, setSelectedAttribute] = useState([
    'enterpriseValue',
    'EnterpriseValue',
    'rgba(24, 144, 255, 1)',
    'rgba(24, 144, 255, .3)'
  ])
  const [chartDatatype, setChartDatatype] = useState('annual')
  const [enterpriseInfo, setEnterpriseInfo] = useState({})
  const [enterpriseQtr, setEnterpriseQtr] = useState({})
  const [profile, setProfile] = useState({})

  //Fetching the data needed
  //Fetching annual, quarterly and company profile
  useEffect(() => {
    async function getEnterpriseInfo() {
      setEnterpriseInfo(
        //here we are fetching only what we need from the income statement
        await getLocalData(
          [...enterpriseIndentifiers],
          'fetchEnterpriseValue',
          [false, 'annual'],
          [...enterpriseIndentifiers]
        )
      )
      //here we are fetching the stock profile
      setProfile(
        await getLocalData(
          [
            'symbol',
            'companyName',
            'image',
            'exchangeShortName',
            'industry',
            'sector',
            'fullTimeEmployees',
            'price'
          ],
          'fetchStockProfile',
          [],
          [
            'symbol',
            'companyName',
            'image',
            'exchangeShortName',
            'industry',
            'sector',
            'fullTimeEmployees',
            'price'
          ]
        )
      )
    }
    getEnterpriseInfo()
  }, [])
  //Here we are fetching the quaterly info
  //I tried putting it in the above use effect but it did not fetch???
  useEffect(() => {
    async function getEnterpriseInfoQtr() {
      const { saveAs, qtrIdentifiers } = getQtrIndentifers(enterpriseIndentifiers)
      setEnterpriseQtr(
        //here we are fetching only what we need from the statement
        await getLocalData(
          [...qtrIdentifiers],
          'fetchEnterpriseValue',
          [false, 'quarter'],
          [...saveAs]
        )
      )
    }
    getEnterpriseInfoQtr()
  }, [])

  //A handler function being passed down to the table that will affect the local state of this component
  function handleTableClick(attribute) {
    setSelectedAttribute(attribute)
  }

  //A handler function being passed down to the buttons that will affect the local state of this component
  function handleChartButtonClick(dataType) {
    setChartDatatype(dataType)
  }

  /**------------------------------------------------------------------------------------------------ */
  //CHART DATA
  //**------------------------------------------------------------------------------------------------ */

  //This is the data I'll put in the chart
  //Selected attribute is defined by what is clicked on in the table
  const attribute = selectedAttribute[0]
  const label = selectedAttribute[1]
  const color = selectedAttribute[2]
  const outline = selectedAttribute[3]
  let chartData = []
  let keys = []

  if (Object.keys(enterpriseQtr).length && Object.keys(enterpriseInfo).length) {
    //Here i'm grabbing a particular array from the fetched object
    chartData =
      chartDatatype === 'quarter'
        ? enterpriseQtr[attribute].values
        : enterpriseInfo[attribute].values
    //The keys taken from he fetch are the dates
    keys =
      chartDatatype === 'quarter' ? enterpriseQtr[attribute].keys : enterpriseInfo[attribute].keys
  }

  const dataset = []

  dataset.push({
    name: label,
    type: 'line',
    color: color,
    // outline: outline,
    values: chartData,
    fillcolor: outline,
    fill: 'tonexty'
  })

  //**------------------------------------------------------------------------------------------------ */
  //TABLE DATA
  //**------------------------------------------------------------------------------------------------ */

  let unformatedData = []
  let rawDates

  if (Object.keys(enterpriseInfo).length) {
    //When enterpriseInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { enterpriseValue } = enterpriseInfo
    rawDates = enterpriseValue.keys

    //Here i'm passing in my local state object and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedDataNums'
    unformatedData = returnUnformatedData(enterpriseInfo, enterpriseIndentifiers)
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const tabledates = Object.keys(enterpriseInfo).length ? formatDates(rawDates) : []

  //Here i'm sending the unformatedData off to be processed
  const { yearlyChanges, rows } = processUnformattedData(unformatedData)

  const tableInfo = {
    tabledates,
    rows,
    yearlyChanges,
    labels: enterpriseTableLabels,
    attributes: enterpriseIndentifiers
  }
  /**------------------------------------------------------------------------------------------------ */
  //RENDER
  //**------------------------------------------------------------------------------------------------ */

  return (
    <>
      <div className="page shadow-deep-nohover">
        <div className="fin-top-container">
          <CompanyInfo profile={profile} />
          <div className="fin-chart-container">
            <FinButtons handleButtonClick={handleChartButtonClick} label={label} buttons={false} />
            <UniversalChart
              className="income-chart fin-chart"
              // title={label}
              keys={keys}
              margin={{ l: 50, r: 50, b: 25, t: 35 }}
              plotBackgroundColor="rgba(30, 34, 45, 0)"
              dataset={dataset}
              showlegend={false}
              hoverdistance={50}
              hovermode="x"
              backgroundColor="fff"
            />
          </div>
        </div>
        <FinTable tableInfo={tableInfo} handleTableClick={handleTableClick} />
      </div>
    </>
  )
}
