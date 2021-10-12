import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { fetchScreenerStocks } from '../../api/api'
import SearchIcon from '../../assets/icons/saved_search'
import Row from './Row'

export default function Table() {
  const [stocksList, setStocksList] = useState([])
  const [shownStocks, setShownStocks] = useState([])

  useEffect(() => {
    async function getStocksList() {
      try {
        const stocks = await fetchScreenerStocks('isEtf=false', 1000)
        setStocksList(stocks)
        setShownStocks(stocks)
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [])

  return (
    <div className="screener-container">
      <div className="screener-scroll-container">
        <div>{getScreenerControls(stocksList, setShownStocks)}</div>
        <SimpleBar className="screener-scroll">
          <table className="screen-table">
            <thead>{getTableHead(shownStocks)}</thead>
            <tbody>{getTableBody(shownStocks)}</tbody>
          </table>
        </SimpleBar>
      </div>
    </div>
  )
}

//* Function to get the table body
function getTableBody(stockList) {
  if (stockList.length)
    return stockList.map((stock, i) => <Row key={stock.symbol} stock={stock} index={i} />)
  return (
    <tr>
      <td>Hold tight while we find some companies for you...</td>
    </tr>
  )
}

//* Function to get table headers
function getTableHead(stockList) {
  if (stockList.length)
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
  return <></>
}

//* Function to get screener controls
function getScreenerControls(stockList, setShownStocks) {
  if (stockList.length)
    return (
      <div className="screener-controls">
        <div>
          <span>{`${stockList.length} loaded`}</span>
        </div>
        <div className="top-search-bar">
          <input
            className="top-search-input"
            placeholder="Search by Symbol"
            onChange={event => {
              const value = event.target.value.toLowerCase()
              if (value.length >= 1) {
                console.log(value)
                setShownStocks(
                  stockList.filter(x => {
                    return (
                      x.symbol.toLowerCase().includes(value) ||
                      x.companyName.toLowerCase().includes(value)
                    )
                  })
                )
              } else setShownStocks(stockList)
            }}
          />
          <SearchIcon className="search-icon" />
        </div>
      </div>
    )
  return <></>
}
