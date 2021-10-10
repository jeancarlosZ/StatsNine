import React, { useEffect, useState } from 'react'
import { fetchRatios } from '../../../../api/api'
import Star from '../../../../assets/icons/star'
import { getLocalData, getTickerResults } from '../../../../store/local/localActions'
import { getStarColor, roundNumberDec } from '../../../../utils'
import StockEPSChart from '../charts/StockEPSChart'
import StockPriceChart from '../charts/StockPriceChart'

//* This is the price metrics page.
//* Shown at /overviewpage/keymetrics/price
export default function Metrics() {
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

  //! Remove
  console.log('--------------------')
  console.log('data:', data)
  console.log('--------------------')
  //! Remove

  return (
    <div className="metric-sub-container">
      <div className="metric-metrics">{getPriceOverview(results)}</div>
      <div className="metric-charts">
        <div className="metric-chart shadow-nohover">
          {/* <StockPriceChart /> */}
          {/* <StockPriceChart /> */}
        </div>
        <div className="metric-chart shadow-nohover">
          {/* <StockEPSChart /> */}
          {/* <StockEPSChart /> */}
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
      <div className="metric">
        {getMetricItem('5yr P/E Ratio < 20', results.pe)}
        <span className="result">{`${
          results.ticker
        } has a 5yr average P/E Ratio of ${roundNumberDec(results.pedata)}!`}</span>
        <div className="desc">
          <p>
            The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures
            its current share price relative to its earnings per share (EPS). The price-to-earnings
            ratio is also sometimes known as the price multiple or the earnings multiple.
          </p>
        </div>
      </div>
      <div className="metric">{getMetricItem('5yr P/FCF Ratio < 20', results.pfcf)}</div>
    </div>
  )
}

function getMetricItem(metric, rating) {
  return (
    <div className="metric-item">
      <Star className="metric-star" fill={getStarColor(rating)} />
      <span className="king">{metric}</span>
    </div>
  )
}
