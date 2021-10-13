import React, { useEffect, useState } from 'react'
import { fetchIncomeStatement } from '../../../../api/api'
import { getLocalData } from '../../../../store/local/localActions'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function StockEPSChart() {
  //* Selected Range, series, and the chart data
  const [dataType, setDataType] = useState('quarter')
  const [data, setData] = useState({})
  //* Do we need to update the data
  const [update, setUpdate] = useState(true)

  //* When the component is mounted we just need
  //* to load the data, and update the state.
  useEffect(() => {
    //* Here we will create a 'async' getData function. Here
    //* you will call all of the functions required apon load.
    async function getData() {
      if (update) {
        // setData({ ...data, [dataType]: await fetchIncomeStatement('MSFT', false, dataType) })
        //* Set the data
        setData({
          ...data, //* Upate data  { ...data, [dataType]: newData }
          [dataType]: await getLocalData(
            'eps', //* Key
            fetchIncomeStatement, //* func
            [false, dataType], //* args
            `eps${dataType}` //* save as
          )
        })
        setUpdate(false)
      }
    }
    //* Now you call the getData function
    getData()
  }, [dataType])

  //* Get the keys and values from the data
  const { keys, values } = !data[dataType] ? data : data[dataType]

  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Stock Price',
      type: 'bar',
      color: 'rgba(0, 136, 123, 0.5)',
      outline: 'rgba(0, 136, 123, 1)',
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      // values: values.map(x => x.eps)
      values: values
    })
  }

  //* Change the series and update the data
  function updateDataType(newType) {
    if (dataType !== newType) {
      setDataType(newType)
      if (!data[newType]) setUpdate(true)
    }
  }

  //* Return the chart
  return (
    <>
      <div className="selector">
        <label>EPS</label>
        <div className="selectors">
          <button
            className={dataType === 'quarter' ? 'selected' : ''}
            onClick={() => updateDataType('quarter')}
          >
            Quarterly
          </button>
          <button
            className={dataType === 'annual' ? 'selected' : ''}
            onClick={() => updateDataType('annual')}
          >
            Annual
          </button>
        </div>
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-price-chart"
          keys={keys}
          dataset={dataset}
          showlegend={false}
          margin={{ l: 50, r: 50, b: 25, t: 35 }}
          //rgba(30, 34, 45, 0.3)
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </>
  )
}
