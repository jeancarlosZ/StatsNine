import React, { useEffect, useState } from 'react'
import { getLocalData } from '../../../store/local/localActions'
import UniversalChart from '../../UniversalChart'
import CompanyInfo from './CompanyInfo'
import { FinButtons } from './FinButtons'
import FinTable from './FinTable'
import { cashflowIndentifiers, cashflowTableLabels, getQtrIndentifers } from './finTableLabels'
import { formatDates, processUnformattedData, returnUnformatedData } from './finUtils'

//Using the getLocalData method
//This method first checks to see if the requested data is in our redux store. If it is, return it, otherwise fetch what we need and log
//that into the local component sate and redux state

export default function Cash() {
  //This attribute is changed by what row is clicked in the table and that affects what data is rendered in the chart
  const [selectedAttribute, setSelectedAttribute] = useState([
    'freeCashFlow',
    'Free Cash Flow',
<<<<<<< HEAD
    // 'rgba(232, 91, 232, 1)',
    // 'rgba(232, 91, 232, .3)',
  ]);
  // const [chartDatatype, setChartDatatype] = useState('annual');
  const [cashflowInfo, setCashflowInfo] = useState({});
  const [cashflowQtr, setCashflowQtr] = useState({});
  const [profile, setProfile] = useState({});
=======
    'rgba(232, 91, 232, 1)',
    'rgba(232, 91, 232, .3)'
  ])
  const [chartDatatype, setChartDatatype] = useState('annual')
  const [cashflowInfo, setCashflowInfo] = useState({})
  const [cashflowQtr, setCashflowQtr] = useState({})
  const [profile, setProfile] = useState({})
>>>>>>> master

  //Fetching the data needed
  //Fetching annual, quarterly and company profile
  useEffect(() => {
    async function getCashflowInfo() {
      setCashflowInfo(
        //here we are fetching only what we need from the statement
        await getLocalData(
          [...cashflowIndentifiers],
          'fetchCashflowStatement',
          [false, 'annual'],
          [...cashflowIndentifiers]
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

    getCashflowInfo()
  }, [])

  //Here we are fetching the quaterly info
  //I tried putting it in the above use effect but it did not fetch???
  useEffect(() => {
    async function getCashflowInfoQtr() {
      const { saveAs, qtrIdentifiers } = getQtrIndentifers(cashflowIndentifiers)
      setCashflowQtr(
        //here we are fetching only what we need from the statement
        await getLocalData(
          [...qtrIdentifiers],
          'fetchCashflowStatement',
          [false, 'quarter'],
          [...saveAs]
        )
      )
    }
    getCashflowInfoQtr()
  }, [])

  //A handler function being passed down to the table that will affect the local state of this component
  function handleTableClick(attribute) {
    setSelectedAttribute(attribute)
  }

  //A handler function being passed down to the buttons that will affect the local state of this component
<<<<<<< HEAD
  // function handleChartButtonClick(dataType) {
  //   setChartDatatype(dataType);
  // }
=======
  function handleChartButtonClick(dataType) {
    setChartDatatype(dataType)
  }
>>>>>>> master
  //**------------------------------------------------------------------------------------------------ */
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

  let chartDataQtr = [];
  let keysQtr = [];
  if (Object.keys(cashflowQtr).length && Object.keys(cashflowInfo).length) {
    //Here i'm grabbing a particular array from the fetched object
<<<<<<< HEAD
    // chartData =
    //   chartDatatype === 'quarter'
    //     ? cashflowQtr[attribute].values
    //     : cashflowInfo[attribute].values;
    // //The keys taken from he fetch are the dates
    // keys =
    //   chartDatatype === 'quarter'
    //     ? cashflowQtr[attribute].keys
    //     : cashflowInfo[attribute].keys;

    chartData = cashflowInfo[attribute].values;
    chartDataQtr = cashflowQtr[attribute].values;

    keys = cashflowInfo[attribute].keys;
    keysQtr = cashflowQtr[attribute].keys;
=======

    chartData =
      chartDatatype === 'quarter' ? cashflowQtr[attribute].values : cashflowInfo[attribute].values
    //The keys taken from he fetch are the dates
    keys = chartDatatype === 'quarter' ? cashflowQtr[attribute].keys : cashflowInfo[attribute].keys
>>>>>>> master
  }

  const dataset = []

  chartDataQtr = chartDataQtr.slice(0, chartDataQtr.length - 2);

  dataset.push({
    name: label,
<<<<<<< HEAD
    type: 'line',
    stroke: '0.5',
    values: chartData,
    cKeys: keys,
    fill: 'tozeroy',
    color: 'rgba(32, 164, 243, .2)',
    fillcolor: 'rgba(32, 164, 243, .7)',
    // outline: 'rgba(44, 221, 155, .4)',
  });

  dataset.push({
    name: label,
    type: 'line',
    stroke: '0.5',
    values: chartDataQtr,
    cKeys: keysQtr,
    fill: 'tozeroy',
    color: 'rgba(148, 28, 47, .4)',
    fillcolor: 'rgba(148, 28, 47, .9)',
    // outline: 'rgba(39, 91, 232, .1)',
  });
  // dataset.push({
  //   name: label,
  //   type: 'line',
  //   stroke: '0.5',
  //   color: color,
  //   values: chartData,
  //   // outline: outline,
  //   fillcolor: outline,
  //   fill: 'tozeroy',
  // });
=======
    type: 'scatter',
    color: color,
    // outline: outline,
    fillcolor: outline,
    fill: 'tonexty',
    values: chartData
  })
>>>>>>> master

  //**------------------------------------------------------------------------------------------------ */
  //TABLE DATA
  //**------------------------------------------------------------------------------------------------ */

  let unformatedData = []
  let rawDates

  if (Object.keys(cashflowInfo).length) {
    //When cashflowInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { freeCashFlow } = cashflowInfo
    rawDates = freeCashFlow.keys

    //Here i'm passing in my local state object and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedData'
    unformatedData = returnUnformatedData(cashflowInfo, cashflowIndentifiers)
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const tabledates = Object.keys(cashflowInfo).length ? formatDates(rawDates) : []

  //Here i'm sending the unformatedData off to be processed
  const { yearlyChanges, rows } = processUnformattedData(unformatedData)

  //Here i'm creating an object with all of my relevent table info that I can pass on to the table
  const tableInfo = {
    tabledates,
    rows,
    yearlyChanges,
    labels: cashflowTableLabels,
    attributes: cashflowIndentifiers
  }

  //**------------------------------------------------------------------------------------------------ */
  //RENDER
  //**------------------------------------------------------------------------------------------------ */

  return (
    <>
      <div className="page shadow-deep-nohover">
        <div className="fin-top-container">
          <CompanyInfo profile={profile} />
          <div className="fin-chart-container">
<<<<<<< HEAD
            <FinButtons
              // handleButtonClick={handleChartButtonClick}
              label={label}
              buttons={false}
            />
=======
            <FinButtons handleButtonClick={handleChartButtonClick} label={label} />
>>>>>>> master
            <UniversalChart
              className="income-chart fin-chart"
              // title={label}
              keys={keysQtr}
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
