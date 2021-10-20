import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadStockProfile, setCurrentStock } from '../../store/local/localActions'
import { formatNumber, roundNumberDec } from '../../utils'

export default function Row({ stock, index }) {
  const rowColor = index % 2 ? 'screen-color' : 'screen-color screen-row'
  const dispatch = useDispatch()
  const history = useHistory()

  // This function sets the selected stock in the redux store and sends the user to the overview page that will be loaded with information for the selected stock.
  async function handleClick() {
    try {
      await dispatch(setCurrentStock(stock.symbol, stock.companyName))
      await loadStockProfile()
      await history.push('/overviewpage')
    } catch (err) {
      console.log(err)
    }
  }

  const isUp = stock.previousClose > stock.price ? 's-down' : 's-up'

  return (
    <tr className={rowColor} onClick={() => handleClick()}>
      <td className="screen-border screen-name dcontainer">
        <div className="screen-blue">{stock.symbol}</div>
        <div>{stock.companyName}</div>
      </td>
      {/* <td className="screen-border screen-num">{price} USD</td> */}
      <td className="screen-border screen-num pcontainer">
        <div className={`screener-price ${isUp}`}>{`$${formatNumber(
          roundNumberDec(stock.price),
          true
        )}`}</div>
        <div className="s-sm">
          <div className={`s-open`}>{`Open: $${formatNumber(
            roundNumberDec(stock.open),
            true
          )}`}</div>
          <div className={`s-high`}>{`Hi: $${formatNumber(
            roundNumberDec(stock.dayHigh),
            true
          )}`}</div>
          <div className={`s-low`}>{`Lo: $${formatNumber(
            roundNumberDec(stock.dayLow),
            true
          )}`}</div>
        </div>
      </td>
      <td className="screen-border screen-num pcontainer">
        <div className={`screener-change ${isUp}`}>{`$${roundNumberDec(stock.change)} ${
          isUp == 's-up' ? '🡅' : '🡇'
        }`}</div>
        <div className={`screener-changeperc ${isUp}`}>{`${roundNumberDec(
          stock.changesPercentage
        )}%`}</div>
      </td>
      <td className="screen-border screen-small pcontainer">
        <div>PE: {roundNumberDec(stock.pe)}</div>
        <div>EPS: {roundNumberDec(stock.eps)}</div>
      </td>
      <td className="screen-border screen-small pcontainer">
        <div>Hi: ${roundNumberDec(stock.yearHigh)}</div>
        <div>Lo: ${roundNumberDec(stock.yearLow)}</div>
      </td>
      <td className="screen-border screen-small pcontainer">
        <div>Market Cap: ${formatNumber(stock.marketCap)}</div>
        <div>Volume: {formatNumber(stock.volume)}</div>
      </td>
      {/* <td className="screen-border screen-num"></td> */}
      <td className="screen-border screen-small pcontainer">
        <div>{stock.sector}</div>
        <div>({stock.industry})</div>
      </td>
    </tr>
  )
}
