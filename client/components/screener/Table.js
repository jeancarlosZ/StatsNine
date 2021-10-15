import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { fetchScreenerStocks } from '../../api/api'
import { getLocalData } from '../../store/local/localActions'
import Row from './Row'

export default function Table() {
  const [stocksList, setStocksList] = useState([])

  useEffect(() => {
    // This function fetches information from the API for 500 stocks and stores it in the local state for rendering.
    async function getStocksList() {
      // const stocks = await fetchScreenerStocks('isEtf=false', 500)
      const stocks = await getLocalData(
        'all',
        'fetchScreenerStocks',
        ['isEtf=false'],
        'screener',
        'system'
      )
      setStocksList(stocks)
    }

    getStocksList()
  }, [])

  return (
    <div className="screener-container">
      <div className="screener-scroll-container">
        <SimpleBar className="screener-scroll">
          <table className="screen-table">
            <thead>{getTableHead(stocksList)}</thead>
            <tbody>{getTableBody(stocksList)}</tbody>
          </table>
        </SimpleBar>
      </div>
    </div>
  )
}

//* Function to get the table body
function getTableBody(stocksList) {
  if (stocksList.length) {
    return stocksList.map((stock, i) => <Row key={stock.symbol} stock={stock} index={i} />)
  } else {
    return (
      <tr>
        <td>Hold tight while we find some companies for you...</td>
      </tr>
    )
  }
}

//* Function to get table headers
function getTableHead(stocksList) {
  if (stocksList.length) {
    return (
      <tr>
        <th className="screen-border-h">Symbol and Name</th>
        <th className="screen-border-h">Last Price</th>
        <th className="screen-border-h">Annual Dividend</th>
        <th className="screen-border-h">Volume</th>
        <th className="screen-border-h">Market Cap</th>
        <th className="screen-border-h">Sector</th>
      </tr>
    )
  } else {
    return <></>
  }
}
