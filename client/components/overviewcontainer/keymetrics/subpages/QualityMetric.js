import React, { useEffect, useState } from 'react'
import { fetchRatios } from '../../../../api/api'
import { getLocalData, getTickerResults } from '../../../../store/local/localActions'
import { formatNumber, formatPercentage, roundNumberDec, trimDate } from '../../../../utils'
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
            {/* <div className="qualityhalf lower"></div> */}
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
        <span className="result">{`${
          results.symbol
        } has a 5yr average P/E Ratio of ${roundNumberDec(results.pedata)}!`}</span>
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
      />
      <QualityPieCharts data={avg} labels={['ROIC', 'POTENTIAL']} upper="5yr" lower="ROIC" />
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
        colors={['rgba(44, 221, 155, .6)', 'rgba(0, 190, 164, .6)']}
      />
      <QualityPieCharts
        data={returnOnEquityTTM}
        labels={['Return On Equity', 'POTENTIAL']}
        upper="TTM"
        lower="Return On Equity"
        margins={{ l: 65, r: 65, b: 65, t: 10 }}
        colors={['rgba(52, 184, 125, .8)', 'rgba(0, 136, 123, .8)']}
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
