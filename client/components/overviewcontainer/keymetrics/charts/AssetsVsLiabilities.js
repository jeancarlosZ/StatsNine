import React, { useEffect, useState } from 'react'
import { getLocalData } from '../../../../store/local/localActions'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function AssetsVsLiabilities() {
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
        //* Add the assets, vs lib data
        setData({
          ...data,
          [dataType]: await getLocalData(
            ['totalAssets', 'totalLiabilities'],
            'fetchBalanceStatement',
            [false, dataType],
            [`assets${dataType}`, `liabilities${dataType}`]
          )
        })
        setUpdate(false)
      }
    }
    //* Now you call the getData function
    getData()
  }, [dataType])

  //* Get the keys and values from the data
  const { totalAssets, totalLiabilities } = !data[dataType] ? data : data[dataType]
  const keys = totalAssets ? totalAssets.keys : { data }

  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (totalAssets) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Assets',
      type: 'line',
      // color: 'rgba(169, 0, 254, 0.5)',
      // outline: 'rgba(169, 0, 254, 1)',
      color: 'rgba(44, 221, 155, 0.4)',
      outline: 'rgba(44, 221, 155, 1)',
      fill: 'tozeroy',
      values: totalAssets.values
    })
  }

  if (totalLiabilities) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Liabilities',
      type: 'line',
      // color: 'rgba(44, 221, 155, 0.6)',
      // outline: 'rgba(44, 221, 155, 1)',
      color: 'rgba(169, 0, 254, 0.6)',
      outline: 'rgba(169, 0, 254, 1)',
      fill: 'tozeroy',
      values: totalLiabilities.values
    })
  }

  //* Customize the legend
  const legend = {
    x: 0,
    xanchor: 'left',
    y: 1,
    bgcolor: 'rgba(30, 34, 45, 0)'
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
        <label>Assets vs. Liabilities</label>
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
          margin={{ l: 45, r: 25, b: 25, t: 15 }}
          dataset={dataset}
          showlegend={true}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          legend={legend}
        />
      </div>
    </>
  )
}
