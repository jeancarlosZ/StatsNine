import React, { useEffect, useState } from 'react'
import { fetchRatios } from '../../../../api/api'
import Star from '../../../../assets/icons/star'
import { getLocalData, getTickerResults } from '../../../../store/local/localActions'
import { formatNumber, getStarColor, roundNumberDec, trimDate } from '../../../../utils'
import PeHistChart from '../charts/PEHistChart'
import PFCFHistChart from '../charts/PFCFHistChart'
import MetricSelector from '../MetricSelector'

//* This is the price metrics page.
//* Shown at /overviewpage/keymetrics/price
export default function PriceMetric() {
  const [results, setResults] = useState({})
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      setResults(await getTickerResults())
      setData(
        await getLocalData(
          ['priceEarningsRatio', 'priceToFreeCashFlowsRatio'],
          fetchRatios,
          [false, 'annual'],
          ['peannual', 'pfcfannual']
        )
      )
    }
    getData()
  }, [])

  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container">
            <div className="metric-metrics">{getPriceOverview(results, data)}</div>
            <div className="metric-charts">
              <div className="metric-chart shadow-nohover">
                <PeHistChart data={data.priceEarningsRatio} />
              </div>
              <div className="metric-chart shadow-nohover">
                <PFCFHistChart data={data.priceToFreeCashFlowsRatio} />
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
function getPriceOverview(results, data) {
  if (!results) return
  return (
    <div className="pricemetrics">
      <div className="metric-spacer"></div>
      <div className="metric">
        {getMetricItem('5yr P/E Ratio < 20', results.pe)}
        <span className="result">{`${
          results.ticker
        } has a 5yr average P/E Ratio of ${roundNumberDec(results.pedata)}!`}</span>
        <div className="desc">
          <p>
            The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures
            its current share price relative to its earnings per share (EPS). A high P/E ratio could
            mean that a company's stock is overvalued, or else that investors are expecting high
            growth rates in the future.
          </p>
        </div>
        <div className="previewcontainer">
          {getDataPreview(data ? data.priceEarningsRatio : null)}
        </div>
      </div>
      <div className="metric">
        {getMetricItem('5yr P/FCF Ratio < 20', results.pfcf)}
        <span className="result">{`${
          results.ticker
        } has a 5yr average P/FCF Ratio of ${roundNumberDec(results.pfcfdata)}!`}</span>
        <div className="desc">
          <p>
            Price to free cash flow is an equity valuation metric used to compare a company's
            per-share market price to its per-share amount of free cash flow (FCF). A lower value
            for price to free cash flow indicates that the company is undervalued and its stock is
            relatively cheap. A higher value for price to free cash flow indicates an overvalued
            company.
          </p>
        </div>
        <div className="previewcontainer">
          {getDataPreview(data ? data.priceToFreeCashFlowsRatio : null)}
        </div>
      </div>
      <div className="metric-spacer"></div>
    </div>
  )
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
