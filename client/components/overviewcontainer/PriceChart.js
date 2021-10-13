import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { DAILY, fetchChartPrice, WEEK, MONTH, THREE_MONTH, SIX_MONTH, YEAR } from '../../api/api'
import { getLocalData } from '../../store/local/localActions'
import UniversalChart from '../UniversalChart'

export default function PriceChart(props) {
  const symbol = props.symbol
  const [range, setRange] = useState(YEAR)
  const [series, setSeries] = useState(DAILY)
  const [data, setData] = useState({})
  const [update, setUpdate] = useState(true)
  let price = 0

  useEffect(() => {
    // This function sets the stock information from the API call to local storage.
    async function getData() {
      try {
        if (update) {
          setData({
            ...data,
            [range]: await getLocalData(
              ['open', 'close', 'low', 'high'],
              fetchChartPrice,
              [series, range, false],
              [
                `price${series}${range}open`,
                `price${series}${range}close`,
                `price${series}${range}low`,
                `price${series}${range}high`,
              ],
            ),
          })
          setUpdate(false)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [symbol, range, series])

  function updateSeries(series, newSeries) {
    if (series !== newSeries) {
      setSeries(newSeries)
      setUpdate(true)
    }
  }

  function updateRange(range, newRange) {
    if (range !== newRange) {
      setRange(newRange)
      if (!data[newRange]) {
        setUpdate(true)
      }
    }
  }

  if (!update) {
    price = data[range].close.values[0]
  }

  return (
    <div className='price-chart flex-col align-self'>
      <span className='price-container flex-row'>
        ${price.toFixed(2)} USD
        {getSelectors(series, range, updateSeries, updateRange)}
      </span>
      <CandleStickChart update={update} symbol={symbol} data={data[range]} />
    </div>
  )
}

// This function uses information from props to render a candlestick chart.
export function CandleStickChart(props) {
  const dataset = []
  let symbol = ''
  let keys = []
  let close = []
  let high = []
  let low = []
  let open = []

  if (!props.update) {
    symbol = props.symbol
    keys = props.data.close.keys
    close = props.data.close.values
    high = props.data.high.values
    low = props.data.low.values
    open = props.data.open.values
  }

  dataset.push({
    customSet: {
      name: `${symbol} Stock Chart`,
      type: 'candlestick',
      x: keys,
      close,
      decreasing: { line: { color: 'red' } },
      high,
      increasing: { line: { color: 'green' } },
      line: { color: 'yellow' },
      low,
      open,
      xaxis: 'x',
      yaxis: 'y',
    },
  })

  return (
    <UniversalChart
      className='candlestick-chart'
      title={`${symbol} Stock Chart`}
      dataset={dataset}
      showlegend={false}
    />
  )
}

function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div className='selector-dropdown-right'>
      <DropdownButton className='dropdown-selector' title={range} size='sm' variant='secondary'>
        <Dropdown.Item onClick={() => updateRange(range, YEAR)}>1 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, SIX_MONTH)}>6 Months</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, THREE_MONTH)}>3 Months</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, MONTH)}>1 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, WEEK)}>1 Week</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}
