import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTickerSymbol } from '../../store/local/localActions'

export default function SearchRow(props) {
  const { symbol, companyName, exchangeShortName } = props.stock
  const dispatch = useDispatch()
  const history = useHistory()

  async function handleClick(ticker) {
    try {
      await dispatch(setTickerSymbol(ticker))
      await history.push('/overviewpage')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr onClick={() => handleClick(symbol)}>
      <td>{symbol}</td>
      <td>{companyName}</td>
      <td>{exchangeShortName}</td>
    </tr>
  )
}
