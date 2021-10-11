import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { roundNumberDec, formatNumber } from '../../utils'
import { loadStockProfile, setCurrentStock } from '../../store/local/localActions'

export default function Row(props) {
  let { companyName, lastAnnualDividend, marketCap, price, sector, symbol, volume } = props.stock
  price = roundNumberDec(price).toFixed(2)
  lastAnnualDividend = roundNumberDec(lastAnnualDividend).toFixed(2)
  volume = formatNumber(volume)
  marketCap = formatNumber(marketCap)
  const rowColor = props.index % 2 ? 'screen-color' : 'screen-color screen-row'
  const dispatch = useDispatch()
  const history = useHistory()

  async function handleClick() {
    try {
      await dispatch(setCurrentStock(symbol, companyName))
      await loadStockProfile()
      await history.push('/overviewpage')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr className={rowColor} onClick={() => handleClick()}>
      <td className="screen-border screen-name">
        <div className="screen-blue">{symbol}</div>
        <div>{companyName}</div>
      </td>
      <td className="screen-border screen-num">{price} USD</td>
      <td className="screen-border screen-num screen-green">{lastAnnualDividend} USD</td>
      <td className="screen-border screen-num">{volume}</td>
      <td className="screen-border screen-num">{marketCap} USD</td>
      <td className="screen-border screen-small">{sector}</td>
    </tr>
  )
}
