import React, { useState, useEffect } from 'react'
import UniversalChart from '../UniversalChart'
import { fetchChartPrice, DAILY, YEAR } from '../../api/api'

export default function PriceChart() {
  const [stockPrices, setStockPrices] = useState([])

  useEffect(() => {
    async function getStockPrices() {
      setStockPrices(await fetchChartPrice('MSFT', DAILY, YEAR, false))
    }

    getStockPrices()
  }, [])

  return (
    <div className='price-chart flex-col align-self'>
      <span className='price-container flex-row pos-rel'>
        <Price stockPrices={stockPrices} />
        <USD />
      </span>
      <OverviewChart stockPrices={stockPrices} />
    </div>
  )
}

function OverviewChart(props) {
  const dataset = []
  const keys = props.stockPrices.keys
  const values = props.stockPrices.values

  if (values.length) {
    dataset.push({
      customSet: {
        name: 'MSFT Stock Chart',
        type: 'candlestick',
        x: keys,
        close: values.map(e => e.close),
        decreasing: { line: { color: 'red' } },
        high: values.map(e => e.high),
        increasing: { line: { color: 'green' } },
        line: { color: 'yellow' },
        low: values.map(e => e.low),
        open: values.map(e => e.open),
        xaxis: 'x',
        yaxis: 'y',
      },
    })
  }

  return (
    <UniversalChart
      className='stock-price-chart'
      title='MSFT Stock Chart'
      dataset={dataset}
      showlegend={false}
    />
  )
}

function Price(props) {
  let price = 0

  if (props.stockPrices.values[0]) {
    price = props.stockPrices.values[0].close
  }

  return <div className='bold'>${price}</div>
}

function USD() {
  return <div className='usd pos-rel'>USD</div>
}
