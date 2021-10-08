import React, { useEffect, useState } from 'react'
import { DAILY, fetchChartPrice, YEAR } from '../../../../api/api'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function StockPriceChart() {
  //* Selected Range, series, and the chart data
  const [range, setRange] = useState(YEAR)
  const [series, setSeries] = useState(DAILY)
  const [data, setData] = useState({})

  //* When the component is mounted we just need
  //* to load the data, and update the state.
  useEffect(() => {
    //* Here we will create a 'async' getData function. Here
    //* you will call all of the functions required apon load.
    async function getData() {
      //* Now update the state with the response
      // TODO: Add a ticker to redux store so we can load data from there
      setData(await fetchChartPrice('MSFT', series, range))
    }
    //* Now you call the getData function
    getData()
  }, [])

  //* Get the keys and values from the data
  const { keys, values } = data
  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Stock Price',
      type: 'line',
      color: 'rgba(39, 91, 232, 1)',
      outline: 'rgba(39, 91, 232, 1)',
      fillcolor: 'rgba(39, 91, 232, .3)',
      fill: 'tonexty',
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      values: values.map(x => x.close)
    })
  }

  //* Return the chart
  return (
    <div className="wrapper">
      <UniversalChart
        className="stock-price-chart"
        title="Stock Price"
        keys={keys}
        dataset={dataset}
        showlegend={true}
        backgroundColor="rgba(30, 34, 45, 0.3)"
        plotBackgroundColor="rgba(30, 34, 45, 0)"
      />
    </div>
  )
}
