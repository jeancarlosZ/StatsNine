import React, { useEffect, useState } from 'react'
import { fetchCashflowStatement, fetchIncomeStatement, fetchRatios } from '../../../../api/api'
import Star from '../../../../assets/icons/star'
import { getLocalData, getTickerResults } from '../../../../store/local/localActions'
import { formatNumber, getStarColor, roundNumberDec, trimDate } from '../../../../utils'
import PeHistChart from '../charts/PEHistChart'
import PFCFHistChart from '../charts/PFCFHistChart'
import MetricSelector from '../MetricSelector'

//* This is the price metrics page.
//* Shown at /overviewpage/keymetrics/price
export default function GrowthMetric() {
  const [results, setResults] = useState({})
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      setResults(await getTickerResults())
      //* Load the data from the API
      const { freeCashFlow, netIncome } = await getLocalData(
        ['freeCashFlow', 'netIncome'],
        fetchCashflowStatement,
        [false, 'annual'],
        ['fcfannual', 'netincomeannual']
      )
      //* Load the data from the API
      const revenue = await getLocalData(
        'revenue',
        fetchIncomeStatement,
        [false, 'annual'],
        'revenueannual'
      )

      //* Save the data to the state here for the charts
      setData({ freeCashFlow, netIncome, revenue })
    }
    getData()
  }, [])

  return (
    <div className="growth-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="gmetric-sub-container">
            <div className="slot gnetincome">
              {getGrowthOverview(results, data, 'netincome')}
              <div className="gmetric-chart shadow-nohover">
                <PeHistChart data={data.netIncome} />
              </div>
            </div>
            <div className="slot gcashflow">
              <div className="gmetric-chart shadow-nohover">
                <PeHistChart data={data.freeCashFlow} />
              </div>
              {getGrowthOverview(results, data, 'netincome')}
            </div>
            <div className="slot grevenue">
              {getGrowthOverview(results, data, 'netincome')}
              <div className="gmetric-chart shadow-nohover">
                <PeHistChart data={data.revenue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to return all of the metrics
//* For an overview, this is what shows all
//* Of the metrics we use to the user.
function getGrowthOverview(results, data, growthType) {
  if (!results) return
  switch (growthType) {
    case 'netincome': {
      return (
        <div className="growthmetrics">
          <div className="metric-spacer"></div>
          <div className="metric">
            {getMetricItem('5yr Net Income Growth', results.netincome)}
            <span className="result">{`${results.ticker} Mircosoft’s has increased it’s net income by $35.78B over the last 5 years or a total increase of 140.369%!`}</span>
            <div className="desc">
              <p>
                Net income is the profit that remains after all expenses and costs have been
                subtracted from revenue. Net income is an all-inclusive metric for profitability and
                provides insight into how well the management team runs all aspects of the business.
                Net income is often referred to as the "bottom line" due to its positioning at the
                bottom of the income statement.
              </p>
            </div>
            <div className="previewcontainer">{getDataPreview(data ? data.netIncome : null)}</div>
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
  const { keys, values } = data
  return (
    <div className="preview shadow-nohover zoomable-med">
      <div className="prev-wrapper">
        <table>
          <tbody>
            <tr>{getTableDatas(keys.slice(-5), trimDate, 'head')}</tr>
            <tr>{getTableDatas(values.slice(-5), formatNumber)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

//* Function to get the table data
function getTableDatas(arr, formatFunc, className) {
  return arr.map((x, i) => (
    <td className={className} key={i}>
      {formatFunc(x)}
    </td>
  ))
}

//* Func to get a metric item, and the star related to it
function getMetricItem(metric, rating) {
  return (
    <div className="metric-item">
      <Star className="metric-star" fill={getStarColor(rating)} />
      <span className="king">{metric}</span>
    </div>
  )
}
