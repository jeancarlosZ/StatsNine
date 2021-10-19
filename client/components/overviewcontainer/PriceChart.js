import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {
  DAILY,
  FIFTEEN_MINUTE,
  FIVE_YEAR,
  FOUR_HOUR,
  HOUR,
  MINUTE,
  MONTH,
  SIX_MONTH,
  TEN_YEAR,
  THIRTY_MINUTE,
  THREE_MONTH,
  WEEK,
  YEAR
} from '../../api/api'
import { getLocalData } from '../../store/local/localActions'
import UniversalChart from '../UniversalChart'

export default function PriceChart({ symbol }) {
  const [range, setRange] = useState(YEAR)
  const [series, setSeries] = useState(DAILY)
  const [data, setData] = useState({})
  const [update, setUpdate] = useState(true)
  let price = 0

  useEffect(() => {
    // This function retrieves information from the redux store and sets it in local storage for rendering.  If the information requested does not exist in the redux store, it will make an API call.
    async function getData() {
      try {
        setData({
          ...data,
          [range]: await getLocalData(
            ['open', 'close', 'low', 'high'],
            'fetchChartPrice',
            [series, range, false],
            [
              `price${series}${range}open`,
              `price${series}${range}close`,
              `price${series}${range}low`,
              `price${series}${range}high`
            ]
          )
        })
        setUpdate(false)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [symbol, range, series])

  // This function checks whether the current series is the same as the selection.  If they are different, update the series and render again.
  function updateSeries(series, newSeries) {
    if (series !== newSeries) {
      setSeries(newSeries)
      setUpdate(true)
    }
  }

  // This function checks whether the current range is the same as the selection.  If they are different, update the range and render again.
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
    <div className="chart-container shadow-deep-nohover">
      <div className="price-container flex-row">
        <label>
          {symbol} Price: ${price.toFixed(2)} USD
        </label>
        {getSelectors(series, range, updateSeries, updateRange)}
      </div>
      <div className="overview-wrapper">
        <CandleStickChart update={update} symbol={symbol} data={data[range]} series={series} />
      </div>
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
      yaxis: 'y'
    }
  })
  const rangeBreaks = {
    rangebreaks: [{ pattern: 'day of week', bounds: ['sat', 'mon'] }]
  }

  if (props.series !== DAILY) rangeBreaks.rangebreaks.push({ pattern: 'hour', bounds: [17, 8] })

  return (
    <UniversalChart
      className="candlestick-chart"
      dataset={dataset}
      backgroundColor="fff"
      plotBackgroundColor="rgba(30, 34, 45, 0)"
      showlegend={false}
      margin={{ l: 50, r: 50, t: 15, b: 25 }}
      xaxis={rangeBreaks}
    />
  )
}

// This function creates a dropdown button with a selection of items to choose from.
function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div className="selector-dropdown-right">
      <DropdownButton className="dropdown-selector" title={range} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => updateRange(range, YEAR)}>1 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, SIX_MONTH)}>6 Months</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, THREE_MONTH)}>3 Months</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, MONTH)}>1 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, WEEK)}>1 Week</Dropdown.Item>
      </DropdownButton>

      <DropdownButton className="dropdown-selector" title={series} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => updateSeries(series, DAILY)}>Daily</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateSeries(series, FOUR_HOUR)}>4 Hour</Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, HOUR)}>1 Hour</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}
