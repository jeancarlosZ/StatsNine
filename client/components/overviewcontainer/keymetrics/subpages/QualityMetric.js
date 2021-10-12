import React, { useEffect, useState } from 'react'
import { getTickerResults } from '../../../../store/local/localActions'
import { formatNumber, trimDate } from '../../../../utils'
import ROICPieChart from '../charts/RoicPieChart'
import MetricSelector from '../MetricSelector'
import { getTableDatas } from './UtilMetrics'

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
            <div className="qualityhalf upper">{getQualityHalfOne(results)}</div>
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
    <>
      <div className="roic-charts">
        <ROICPieChart data={vals[vals.length - 1]} label="TTM" />
        <ROICPieChart data={avg} label="5yr" />
      </div>
      <div className="metric-roic">
        {/* Get Metric */}
        {/*  */}
      </div>
      <div></div>
    </>
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
