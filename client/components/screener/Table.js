import React, { useState, useEffect } from 'react'
import { fetchScreenerStocks } from '../../api/api'
import Row from './Row'

export default function Table() {
  const [stocksList, setStocksList] = useState([])

  useEffect(() => {
    async function getStocksList() {
      try {
        setStocksList(await fetchScreenerStocks())
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [])

  return (
    <div>
      <table className='screen-table'>
        <thead>
          <tr>
            <th className='screen-border-h'>Symbol and Name</th>
            <th className='screen-border-h'>Last Price</th>
            <th className='screen-border-h'>Annual Dividend</th>
            <th className='screen-border-h'>Volume</th>
            <th className='screen-border-h'>Market Cap</th>
            <th className='screen-border-h'>Sector</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.length ? (
            stocksList.map((stock, i) => <Row key={stock.symbol} stock={stock} index={i} />)
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
