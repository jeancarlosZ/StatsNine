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
  }, [props.query])

  return (
    <div className='search-table'>
      <table>
        <thead>
          <tr>
            <th className='search-cell'>Symbol </th>
            <th className='search-cell2'>Name</th>
            <th className='search-cell'>Exchange</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.length ? (
            stocksList.map(stock => <SearchRow key={stock.symbol} stock={stock} />)
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
