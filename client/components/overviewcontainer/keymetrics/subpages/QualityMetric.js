import React, { useEffect, useState } from 'react'
import { fetchRatios } from '../../../../api/api'
import { getLocalData, getTickerResults, GOOD } from '../../../../store/local/localActions'
import {
  formatNumber,
  formatPercentage,
  getDifferenceBetween,
  getFirstLastArr,
  getPercentDifference,
  roundNumberDec,
  trimDate
} from '../../../../utils'
import QualityPieCharts from '../charts/QualityPieCharts'
import MetricSelector from '../MetricSelector'
import { getMetricItem, getTableDatas } from './UtilMetrics'

export default function QualityMetric() {
  const [results, setResults] = useState({})
  const [data, setData] = useState({})

  //* When component mounts
  useEffect(() => {
    async function getData() {
      //* Get the ticker results
      setResults(await getTickerResults())
      //* Fetch the ratio data
      setData(
        await getLocalData(
          ['returnOnAssetsTTM', 'returnOnEquityTTM'],
          fetchRatios,
          [true],
          ['returnOnAssetsTTM', 'returnOnEquityTTM']
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
          <div className="metric-sub-container quality-subcontainer">
            {getQualityHalfOne(results, data)}
            {getQualityHalfTwo(results)}
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to get the top half of the quality
//* Metrics page
function getQualityHalfOne(results, data) {
  //* If the data has not loaded...
  if (!results.roic || !data.returnOnAssetsTTM)
    return <div className="qload">Hold tight while we load your data!</div>
  //* Otherwise return the JSX
  return (
    <div className="qualityhalf upper">
      {getROICCharts(results)}
      <div className="metric-roic">
        {getMetricItem('5yr ROIC >= 10 %', results.roic)}
        <span className="result">{`${results.symbol} has a 5yr average ROIC of ${formatPercentage(
          results.roicdata.avg
        )}%!`}</span>
        <div className="desc">
          <p>
            Return on invested capital (ROIC) is a calculation used to assess a company's efficiency
            at allocating the capital under its control to profitable investments. ROIC gives a
            sense of how well a company is using its capital to generate profits. A company is
            thought to be creating value if its ROIC exceeds its weighted average cost of capital
            (WACC).
          </p>
        </div>
        <div className="previewcontainer">{getDataPreview(results.roicdata.vals)}</div>
      </div>
      {getTTMReturnsCharts(data)}
    </div>
  )
}

//* Function to get the top half of the quality
//* Metrics page
function getQualityHalfTwo(results) {
  //* If the data has not loaded...
  if (!results.shares) return <></>

  //* Otherwise return the JSX
  return (
    <div className="qualityhalf lower">
      <div className="metric-shares">
        {getMetricItem('5yr Shares Outstanding  (Decreasing)', results.shares)}
        <span className="result">{getResultMessage(results)}</span>
        <div className="desc">
          <p>
            Shares outstanding refer to a company's stock currently held by all its shareholders.
            When a company issues shares, it's shareholders are essentially getting a "smaller piece
            of the pie" where as when a company buy's back it's shares, it's shareholders are
            rewarded with a "larger piece of the pie." When a company buy's back it's shares it can
            also signify that the boardmembers think the stock is cheap!
          </p>
        </div>
        <div className="previewcontainer">{getDataPreview(results.roicdata.vals)}</div>
      </div>
      {/* {getTTMReturnsCharts(data)} */}
    </div>
  )
}

//* Get the message to place in shares outstanding results
function getResultMessage(results) {
  const phrase = results.shares === GOOD ? 'bought back' : 'sold off'
  const shareClone = [...results.sharesdata]
  const pdiff = getPercentDifference(...getFirstLastArr(shareClone))
  const tdiff = getDifferenceBetween(shareClone)

  return `${results.symbol}'s has ${phrase} ${formatNumber(
    tdiff
  )} (${pdiff}%) shares in the last 5 years!`
}

//* Get the two Pie charts for ROIC TTM & 5yr
function getROICCharts(results) {
  //* Otherwise the data has loaded
  const { avg, vals } = results.roicdata
  return (
    <div className="roic-charts">
      <QualityPieCharts
        data={vals.v[vals.v.length - 1]}
        labels={['ROIC', 'POTENTIAL']}
        upper="TTM"
        lower="ROIC"
        // colors={['rgba(44, 221, 155, .8)', 'rgba(52, 184, 125, .8)']}
        colors={['rgba(44, 221, 155, .8)', 'rgba(52, 184, 125, .8)']}
      />
      <QualityPieCharts
        data={avg}
        labels={['ROIC', 'POTENTIAL']}
        upper="5yr"
        lower="ROIC"
        colors={['rgba(52, 184, 125, .8)', 'rgba(0, 136, 123, .8)']}
      />
    </div>
  )
}

//* Get the two Pie charts for return on Assets and Equity TTM
function getTTMReturnsCharts(data) {
  const { returnOnAssetsTTM, returnOnEquityTTM } = data
  return (
    <div className="roic-charts">
      <QualityPieCharts
        data={returnOnAssetsTTM}
        labels={['Return On Assets', 'POTENTIAL']}
        upper="TTM"
        lower="Return on Assets"
        margins={{ l: 65, r: 65, b: 65, t: 10 }}
        colors={['rgba(52, 184, 125, .7)', 'rgba(0, 136, 123, .7)']}
      />
      <QualityPieCharts
        data={returnOnEquityTTM}
        labels={['Return On Equity', 'POTENTIAL']}
        upper="TTM"
        lower="Return On Equity"
        margins={{ l: 65, r: 65, b: 65, t: 10 }}
        colors={['rgba(44, 221, 155, .7)', 'rgba(52, 184, 125, .7)']}
      />
    </div>
  )
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
            <tr>{getTableDatas(v, formatPercentage, '', [true, true])}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
