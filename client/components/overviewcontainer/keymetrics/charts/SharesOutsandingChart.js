import React, { useEffect, useState } from 'react'
import { fetchEnterpriseValue } from '../../../../api/api'
import { getLocalData } from '../../../../store/local/localActions'
import UniversalChart from '../../../UniversalChart'

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function SharesOustandingChart() {
  const [data, setData] = useState({})
  const [dataType, setDataType] = useState('annual')
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    async function getData() {
      if (update) {
        //* Load the shares data
        const numberOfShares = await getLocalData(
          'numberOfShares',
          'fetchEnterpriseValue',
          [dataType],
          `shares${dataType}`,
        )
        //* Set the data, set update to false
        setData({ ...data, [dataType]: numberOfShares })
        setUpdate(false)
      }
    }
    getData()
  }, [update])

  //* Get the keys and values from the data
  const { keys, values } = !data[dataType] ? {} : data[dataType]

  //* Create our dataset
  const dataset = []

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: name,
      type: 'bar',
      // color: 'rgba(44, 221, 155, 0.3)',
      // outline: 'rgba(44, 221, 155, 0.6)',
      color: 'rgba(43, 186, 255, 0.3)',
      outline: 'rgba(43, 186, 255, 0.6)',
      values: values,
    })
  }

  //* Change the series and update the data
  function updateDataType(newType) {
    //* If datatype clicked is not data type selected
    if (dataType !== newType) {
      //* Switch the data type
      setDataType(newType)
      //* If that datatype is not loaded, update required
      if (!data[newType]) setUpdate(true)
    }
  }

  //* Return the chart
  return (
    <div className='shares-outstanding-chart shadow-deep-nohover'>
      <div className='selector'>
        <label>Shares Outstanding</label>
        <div className='selectors'>
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
      <div className='wrapper'>
        <UniversalChart
          className='stock-price-chart'
          keys={keys}
          dataset={dataset}
          showlegend={false}
          margin={{ l: 50, r: 50, b: 25, t: 35 }}
          backgroundColor='fff'
          plotBackgroundColor='rgba(30, 34, 45, 0)'
          hoverdistance={50}
          hovermode='x'
        />
      </div>
    </div>
  )
}
