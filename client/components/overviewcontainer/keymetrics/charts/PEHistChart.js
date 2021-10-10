import React, { useEffect, useState } from 'react'
import { fetchIncomeStatement } from '../../../../api/api'
import { getLocalData } from '../../../../store/local/localActions'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function PeHistChart({ data }) {
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
      name: 'PE Ratio',
      type: 'bar',
      color: 'rgba(44, 221, 155, 0.3)',
      outline: 'rgba(44, 221, 155, 0.6)',
      // color: 'rgba(0, 136, 123, 0.5)',
      // outline: 'rgba(0, 136, 123, 1)',
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      // values: values.map(x => x.eps)
      values: values
    })
  }

  //* Return the chart
  return (
    <>
      <div className="selector">
        <label>P/E Ratio</label>
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-price-chart"
          keys={keys}
          dataset={dataset}
          showlegend={false}
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
