import React, { useEffect, useState } from 'react'
import { fetchIncomeStatement } from '../../../../api/api'
import { getLocalData } from '../../../../store/local/localActions'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function Growthchart({
  data,
  title,
  color,
  outline,
  type,
  name,
  args = {},
  dataType,
  setDataType
}) {
  //* Get the keys and values from the data
  const { keys, values } = data ? data : {}

  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: name,
      type: type ? type : 'bar',
      color: color ? color : 'rgba(44, 221, 155, 0.3)',
      outline: outline ? outline : 'rgba(44, 221, 155, 0.6)',
      values: values,
      ...args
    })
  }

  //* Change the series and update the data
  function updateDataType(newType) {
    if (dataType[name] !== newType) setDataType({ ...dataType, [name]: newType })
  }

  //* Return the chart
  return (
    <>
      <div className="selector">
        <label>{title}</label>
        <div className="selectors">
          <button
            className={dataType[name] === 'quarter' ? 'selected' : ''}
            onClick={() => updateDataType('quarter')}
          >
            Quarterly
          </button>
          <button
            className={dataType[name] === 'annual' ? 'selected' : ''}
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
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          hoverdistance={50}
          hovermode="x"
        />
      </div>
    </>
  )
}
