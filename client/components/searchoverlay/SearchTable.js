import React from 'react'
import SearchRow from './SearchRow'

export default function SearchTable(props) {
  const close = props.close
  const stocksList = props.stocksList

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
            stocksList.map(stock => <SearchRow key={stock.symbol} stock={stock} close={close} />)
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
