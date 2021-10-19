import React, { useEffect, useState } from 'react'
import { getTickerResults } from '../../../../store/local/localActions'
import StockEPSChart from '../charts/StockEPSChart'
import StockPriceChart from '../charts/StockPriceChart'
import MetricSelector from '../MetricSelector'
import { getMetricItem } from './UtilMetrics'

//* This is the default/overview metrics page.
//* Shown at /overviewpage/keymetrics
export default function Metrics() {
  const [results, setResults] = useState({})

  useEffect(() => {
    async function getData() {
      setResults(await getTickerResults())
    }
    getData()
  }, [])

  return (
    <div className='key-metrics-container'>
      <div className='sub-container shadow-deep-nohover'>
        <MetricSelector />
        {getMetricsPage(results)}
      </div>
    </div>
  )
}

//* Function to return most of the page
function getMetricsPage(results) {
  if (!results.pe) return <div className='qload'>Hold tight while we load your data!</div>
  return (
    <div className='metric-container'>
      <div className='metric-sub-container'>
        <div className='metric-metrics'>{getMetricOverview(results)}</div>
        <div className='metric-charts'>
          <div className='metric-chart shadow-nohover'>
            <StockPriceChart />
          </div>
          <div className='metric-chart shadow-nohover'>
            <StockEPSChart />
          </div>
        </div>
      </div>
    </div>
  )
}

//* Function to return all of the metrics
//* For an overview, this is what shows all
//* Of the metrics we use to the user.
function getMetricOverview(results) {
  if (!results.pe) return <div className='qload'>Hold tight while we load your data!</div>
  return (
    <div className='metrics'>
      <div className='metric'>
        <label>{'Price Metrics'}</label>
        {getMetricItem('P/E Ratio', results.pe, false)}
        {getMetricItem('P/FCF Ratio', results.pfcf, false)}
      </div>
      <div className='metric'>
        <label>{'Growth Metrics'}</label>
        {getMetricItem('Revenue Growth', results.revgrowth, false)}
        {getMetricItem('Cash Flow Growth', results.cashgrowth, false)}
        {getMetricItem('Net Income Growth', results.netincome, false)}
      </div>
      <div className='metric'>
        <label>{'Quality Metrics'}</label>
        {getMetricItem('ROIC', results.roic, false)}
        {getMetricItem('Shares Outstanding', results.shares, false)}
      </div>
      <div className='metric'>
        <label>{'Safety Metrics'}</label>
        {getMetricItem('Assets > Liabilities', results.assets, false)}
        {getMetricItem('LT Liabilities / FCF', results.ltl, false)}
      </div>
      <div className='metric-spacer'></div>
    </div>
  )
}
