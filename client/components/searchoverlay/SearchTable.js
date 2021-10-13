import React from 'react'
import SearchRow from './SearchRow'

export default function SearchTable(props) {
  const open = props.open
  const stocksList = props.stocksList

  return (
    <div className='search-table'>
      <table>
        <thead>{tableHead(stocksList)}</thead>
        <tbody>{tableBody(stocksList, open)}</tbody>
      </table>
    </div>
  )
}

// This function returns the table head JSX.
function tableHead(stocksList) {
  if (stocksList.length) {
    return (
      <tr>
        <th className='search-cell'>Symbol </th>
        <th className='search-cell2'>Name</th>
        <th className='search-cell'>Exchange</th>
      </tr>
    )
  } else {
    return <></>
  }
}

// This function returns the table body JSX.
function tableBody(stocksList, open) {
  if (stocksList.length) {
    return stocksList.map(stock => <SearchRow key={stock.symbol} stock={stock} open={open} />)
  } else {
    return (
      <tr className='search-row'>
        <td className='search-noresults'>No results found...</td>
      </tr>
    )
  }
}
