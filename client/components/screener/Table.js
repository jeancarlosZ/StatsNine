import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { getScreenerData } from '../../store/local/localActions'
import { getLoadingMessage } from '../../utils'
import Row from './Row'

//* This is the screener
export default function Table() {
  const [stockList, setStockList] = useState([])
  const [stocksMap, setStocksMap] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // This function fetches information from the API for 500 stocks and stores it in the local state for rendering.
    async function getStocksList() {
      const fetchedMap = await getScreenerData('', 500, 60)
      setStocksMap(fetchedMap)
      setLoaded(true)

      // const stocks = await getLocalData(
      //   'all',
      //   'fetchScreenerStocks',
      //   ['isEtf=false'],
      //   'screener',
      //   'system'
      // )
      // setStocksList(stocks)
    }

    getStocksList()
  }, [])

  return (
    <div className="screener-page">
      <div className="screener-container">
        <div className="screener-scroll-container">{getPage(stocksMap, loaded)}</div>
      </div>
    </div>
  )
}

//* Return either the page or loading message
function getPage(stocksMap, loaded) {
  if (!loaded)
    return (
      <div className="screener-title">
        <label className="shadow-nohover">{getLoadingMessage()}</label>
      </div>
    )
  return (
    <>
      <div className="screener-title">
        <label className="shadow-nohover">Stock Screener</label>
      </div>
      <SimpleBar className="screener-scroll shadow-nohover">
        <table className="screen-table">
          <thead>{getTableHead(stocksMap)}</thead>
          <tbody>{getTableBody(stocksMap)}</tbody>
        </table>
      </SimpleBar>
    </>
  )
}

//* Function to get the table body
function getTableBody(stocksList) {
  // if (stocksList.length) {
  if (Object.keys(stocksList).length) {
    // return stocksList.map((stock, i) => <Row key={stock.symbol} stock={stock} index={i} />)
    return Object.keys(stocksList).map((stock, i) => (
      <Row key={stock} stock={stocksList[stock]} index={i} />
    ))
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
  // if (stocksList.length) {
  if (Object.keys(stocksList).length) {
    return (
      <tr>
        <th className="screen-border-h">Symbol and Name</th>
        <th className="screen-border-h">Price</th>
        <th className="screen-border-h">Change</th>
        <th className="screen-border-h">Earnings</th>
        <th className="screen-border-h">52 Week</th>
        <th className="screen-border-h">Other</th>
        {/* <th className="screen-border-h">Volume</th> */}
        {/* <th className="screen-border-h">Market Cap</th> */}
        <th className="screen-border-h">Sector</th>
      </tr>
    )
  } else {
    return <></>
  }
}
