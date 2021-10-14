import React, { useEffect, useState } from 'react'
import { fetchCashflowStatement, fetchIncomeStatement } from '../../../../api/api'
import { getLocalData, getTickerResults } from '../../../../store/local/localActions'
import {
  formatNumber,
  getDifferenceBetween,
  getFirstLastArr,
  getPercentDifference,
  isSameObject,
  trimDate
} from '../../../../utils'
import Growthchart from '../charts/GrowthChart'
import MetricSelector from '../MetricSelector'
import { getMetricItem, getTableDatas } from './UtilMetrics'

//* This is the price metrics page.
//* Shown at /overviewpage/keymetrics/price
export default function GrowthMetric() {
  const [results, setResults] = useState({})
  //* Selected Range, series, and the chart data
  const [dataType, setDataType] = useState({ fcf: 'quarter', net: 'quarter', rev: 'quarter' })
  const [data, setData] = useState({ net: {}, fcf: {}, rev: {} })
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    async function getData() {
      setResults(await getTickerResults())
      if (update) {
        //* Load the data from the API
        const netIncome = await getLocalData(
          'netIncome',
          fetchCashflowStatement,
          [false, dataType.net],
          `netincome${dataType.net}`
        )
        //* Load the data from the API
        const freeCashFlow = await getLocalData(
          'freeCashFlow',
          fetchCashflowStatement,
          [false, dataType.fcf],
          `fcf${dataType.fcf}`
        )
        //* Load the data from the API
        const revenue = await getLocalData(
          'revenue',
          fetchIncomeStatement,
          [false, dataType.rev],
          `revenue${dataType.rev}`
        )

        const newData = data
        newData.net[dataType.net] = netIncome
        newData.fcf[dataType.fcf] = freeCashFlow
        newData.rev[dataType.rev] = revenue

        //* Save the data to the state here for the charts
        setData(newData)
        setUpdate(false)
      }
    }
    getData()
  }, [update, dataType])

  return (
    <div className="growth-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="gmetric-sub-container">
            {getGrowthMetricPage(data, results, dataType, setDataType, setUpdate)}
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to get the growth metrics page
function getGrowthMetricPage(data, results, dataType, setDataType, setUpdate) {
  if (!data.net || !results.pe)
    return <div className="qloads">Hold tight while we load your data!</div>
  return (
    <>
      <div className="slot gnetincome">
        {getGrowthOverview(results, data, 'netincome')}
        <div className="gmetric-chart shadow-nohover">
          <Growthchart
            title="Net Income"
            color="rgba(250, 173, 20, 0.3)"
            outline="rgba(250, 173, 20, 0.6)"
            type=""
            name="net"
            data={data.net}
            dataType={dataType}
            setDataType={setDataType}
            setUpdate={setUpdate}
          />
        </div>
      </div>
      <div className="slot gcashflow">
        <div className="gmetric-chart shadow-nohover">
          <Growthchart
            title="Cash Flow"
            color="rgba(41, 98, 254, 0.3)"
            outline="rgba(41, 98, 254, 0.6)"
            type=""
            name="fcf"
            data={data.fcf}
            dataType={dataType}
            setDataType={setDataType}
            setUpdate={setUpdate}
          />
        </div>
        {getGrowthOverview(results, data, 'cashflow')}
      </div>
      <div className="slot grevenue">
        {getGrowthOverview(results, data, 'revenue')}
        <div className="gmetric-chart shadow-nohover">
          <Growthchart
            title="Revenue"
            color="rgba(243, 142, 176, 0.4)"
            outline="rgba(243, 142, 176, 0.6)"
            type=""
            name="rev"
            data={data.rev}
            dataType={dataType}
            setDataType={setDataType}
            setUpdate={setUpdate}
          />
        </div>
      </div>
    </>
  )
}

//* Function to return all of the metrics
//* For an overview, this is what shows all
//* Of the metrics we use to the user.
function getGrowthOverview(results, data, growthType) {
  if (!results.netincome) return <div className="qload">Hold tight while we load your data!</div>
  switch (growthType) {
    case 'netincome': {
      const dataarr = results.netincomedata ? results.netincomedata.v.slice(-5) : null
      const difference = dataarr ? formatNumber(getDifferenceBetween(dataarr)) : 0
      const change = dataarr ? getPercentDifference(...getFirstLastArr(dataarr)) : 0
      return (
        <div className="growthmetrics">
          <div className="metric-spacer"></div>
          <div className="metric">
            {getMetricItem('5yr Net Income Growth', results.netincome)}
            <span className="result">{`${results.symbol} has increased it’s net income by ${difference} over the last 5 years for a change of ${change}%!`}</span>
            <div className="desc">
              <p>
                Net income is the profit that remains after all expenses and costs have been
                subtracted from revenue. Net income is an all-inclusive metric for profitability and
                provides insight into how well the management team runs all aspects of the business.
                Net income is often referred to as the "bottom line" due to its positioning at the
                bottom of the income statement.
              </p>
            </div>
            <div className="previewcontainer">
              {getDataPreview(results ? results.netincomedata : null)}
            </div>
          </div>
          <div className="metric-spacer"></div>
        </div>
      )
    }
    case 'cashflow': {
      const dataarr = results.cashgrowthdata ? results.cashgrowthdata.v.slice(-5) : null
      const difference = dataarr ? formatNumber(getDifferenceBetween(dataarr)) : 0
      const change = dataarr ? getPercentDifference(...getFirstLastArr(dataarr)) : 0
      return (
        <div className="growthmetrics">
          <div className="metric-spacer"></div>
          <div className="metric">
            {getMetricItem('5yr Cash Flow Growth', results.cashgrowth)}
            <span className="result">{`${results.symbol} has increased it’s FCF by ${difference} over the last 5 years for a change of ${change}%!`}</span>
            <div className="desc">
              <p>
                Free cash flow (FCF) represents the cash a company generates after accounting for
                cash outflows to support operations and maintain its capital assets. Because FCF
                accounts for changes in working capital, it can provide important insights into the
                value of a company and the health of its fundamental trends.
              </p>
            </div>
            <div className="metric-spacer"></div>
            <div className="previewcontainer">
              {getDataPreview(results ? results.cashgrowthdata : null)}
            </div>
          </div>
        </div>
      )
    }
    case 'revenue': {
      const dataarr = results.revgrowthdata ? results.revgrowthdata.v.slice(-5) : null
      const difference = dataarr ? formatNumber(getDifferenceBetween(dataarr)) : 0
      const change = dataarr ? getPercentDifference(...getFirstLastArr(dataarr)) : 0
      return (
        <div className="growthmetrics">
          <div className="metric-spacer"></div>
          <div className="metric">
            {getMetricItem('5yr Revenue Growth', results.revgrowth)}
            <span className="result">{`${results.symbol} has increased it’s total revenue by ${difference} over the last 5 years for a change of ${change}%!`}</span>
            <div className="desc">
              <p>
                Revenue is the money generated from normal business operations, calculated as the
                average sales price times the number of units sold. Revenue is known as the top line
                because it appears first on a company's income statement. There is a profit when
                revenues exceed expenses.
              </p>
            </div>
            <div className="previewcontainer">
              {getDataPreview(results ? results.revgrowthdata : null)}
            </div>
          </div>
          <div className="metric-spacer"></div>
        </div>
      )
    }
  }
}

//* Function to return the data preview
//* Should take you to the proper financials
//* whenever the user clicks on it!
function getDataPreview(data) {
  if (!data) return <div className="preview">Loading...</div>
  const { k, v } = data
  return (
    <div className="preview shadow-nohover zoomable-med">
      <div className="prev-wrapper">
        <table>
          <tbody>
            <tr>{getTableDatas(k, trimDate, 'head')}</tr>
            <tr>{getTableDatas(v, formatNumber)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
