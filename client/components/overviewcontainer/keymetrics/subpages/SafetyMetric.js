import React, { useEffect, useState } from 'react'
import Star from '../../../../assets/icons/star'
import { getTickerResults, GOOD } from '../../../../store/local/localActions'
import {
  formatNumber,
  getDifferenceBetween,
  getFirstLastArr,
  getPercentDifference,
  getStarColor,
  isSameObject,
  roundNumberDec,
  trimDate
} from '../../../../utils'
import AssetsVsLiabilities from '../charts/AssetsVsLiabilities'
import MetricSelector from '../MetricSelector'

export default function SafetyMetric() {
  const [results, setResults] = useState({})

  useEffect(() => {
    async function getData() {
      //* Load the ticker results
      setResults(await getTickerResults())
    }
    getData()
  }, [])

  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container">
            <div className="metric-metrics">{getPriceOverview(results)}</div>
            <div className="metric-charts">
              <div className="metric-chart shadow-nohover">
                <AssetsVsLiabilities />
              </div>
              <div className="metric-chart shadow-nohover">
                <AssetsVsLiabilities />
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
function getPriceOverview(results) {
  if (!results || isSameObject({}, results)) return <></>

  const { k, a, b } = results.assetsdata
  const difference = getDifferenceBetween(a)
  const percdiffc = getPercentDifference(a[a.length - 1], b[b.length - 1])

  const assetsresults = `${results.symbol} has ${roundNumberDec(percdiffc)}% greater ${
    results.assets === GOOD ? 'Assets' : 'Liabilities'
  } than ${results.assets === GOOD ? 'Liabilities' : 'Assets'}! That's a five year ${
    difference > 0 ? 'increase' : 'decrease'
  } of ${formatNumber(difference)} in assets!`

  return (
    <div className="pricemetrics">
      <div className="metric-spacer"></div>
      <div className="metric">
        {getMetricItem('Assets < Liabilities', results.assets)}
        <span className="result">{assetsresults}</span>
        <div className="desc">
          <p>
            Financially healthy companies generally have a manageable amount of debt (liabilities).
            If the debt level has been falling over time, that’s a good sign. A business with more
            assets than liabilities is also a good sign. However, if liabilities are more than
            assets, you need to look more closely at the company’s ability to pay its debt
            obligations.
          </p>
        </div>
        <div className="previewcontainer">{getDataPreview(k, a, b)}</div>
      </div>
      <div className="metric">
        {getMetricItem('5yr P/E Ratio < 20', results.pe)}
        <span className="result">{`${
          results.symbol
        } has a 5yr average P/E Ratio of ${roundNumberDec(results.pedata)}!`}</span>
        <div className="desc">
          <p>
            The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures
            its current share price relative to its earnings per share (EPS). A high P/E ratio could
            mean that a company's stock is overvalued, or else that investors are expecting high
            growth rates in the future.
          </p>
        </div>
      </div>
      <div className="metric-spacer"></div>
    </div>
  )
}

//* Function to return the data preview
//* Should take you to the proper financials
//* whenever the user clicks on it!
function getDataPreview(k, a, b) {
  return (
    <div className="safety-preview shadow-nohover zoomable-med">
      <div className="prev-wrapper">
        <table>
          <tbody>
            <tr>{getTableDatas(k, trimDate, 'head')}</tr>
            <tr>{getTableDatas(a, formatNumber, 'assets')}</tr>
            <tr>{getTableDatas(b, formatNumber, 'liabilities')}</tr>
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
