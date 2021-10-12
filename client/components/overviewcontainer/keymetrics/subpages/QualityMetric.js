import React, { useEffect, useState } from 'react'
import { getTickerResults } from '../../../../store/local/localActions'
import { formatNumber, roundNumberDec, trimDate } from '../../../../utils'
import ROICPieChart from '../charts/RoicPieChart'
import MetricSelector from '../MetricSelector'
import { getMetricItem, getTableDatas } from './UtilMetrics'

export default function QualityMetric() {
  const [results, setResults] = useState({})

  useEffect(() => {
    async function getData() {
      setResults(await getTickerResults())
    }
    getData()
  }, [])

  return (
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container quality-subcontainer">
            {getQualityHalfOne(results)}
            {/* <div className="qualityhalf lower"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to get the top half of the quality
//* Metrics page
function getQualityHalfOne(results) {
  if (!results.roic) return <></>
  const { avg, vals } = results.roicdata
  return (
    <div className="qualityhalf upper">
      <div className="roic-charts">
        <ROICPieChart data={vals[vals.length - 1]} label="TTM" />
        <ROICPieChart data={avg} label="5yr" />
      </div>
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
        <div className="previewcontainer">{getDataPreview(vals ? vals : null)}</div>
      </div>
      <div></div>
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
            <tr>{getTableDatas(v, formatNumber)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
