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
    <div className="key-metrics-container">
      <div className="sub-container shadow-deep-nohover">
        <MetricSelector />
        <div className="metric-container">
          <div className="metric-sub-container">
            <div className="metric-metrics">{getMetricOverview(results)}</div>
            <div className="metric-charts">
              <div className="metric-chart shadow-nohover">
                <StockPriceChart />
              </div>
              <div className="metric-chart shadow-nohover">
                <StockEPSChart />
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
function getMetricOverview(results) {
  if (!results) return
  return (
    <div className="metrics">
      <div className="metric">
        <label>{'Price Metrics'}</label>
        {getMetricItem('5yr P/E Ratio < 20', results.pe)}
        {getMetricItem('5yr P/FCF Ratio < 20', results.pfcf)}
      </div>
      <div className="metric">
        <label>{'Growth Metrics'}</label>
        {getMetricItem('5yr Revenue Growth', results.revgrowth)}
        {getMetricItem('5yr Cash Flow Growth', results.cashgrowth)}
        {getMetricItem('5yr Net Income Growth', results.netincome)}
      </div>
      <div className="metric">
        <label>{'Quality Metrics'}</label>
        {getMetricItem('5yr ROIC >= 10%', results.roic)}
        {getMetricItem('5yr Shares Outstanding  (Decreasing)', results.shares)}
      </div>
      <div className="metric">
        <label>{'Saftey Metrics'}</label>
        {getMetricItem('Assets > Liabilities', results.assets)}
        {getMetricItem('LT Liabilities / 5 Yr FCF; < 5', results.ltl)}
      </div>
      <div className="metric-spacer"></div>
    </div>
  )
}
