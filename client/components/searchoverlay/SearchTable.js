import React, { useState, useEffect } from 'react'
import { fetchSearchQuery } from '../../api/api'
import SearchRow from './SearchRow'

export default function SearchTable(props) {
  const [stocksList, setStocksList] = useState([])

  useEffect(() => {
    async function getStocksList() {
      try {
        setStocksList(await fetchSearchQuery(props.query))
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Symbol </th>
            <th>Name</th>
            <th>Exchange</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.length ? (
            stocksList.map((stock, i) => <SearchRow key={stock.symbol} stock={stock} index={i} />)
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
