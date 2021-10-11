import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTickerSymbol } from '../../store/local/localActions'

export default function SearchRow(props) {
  const { symbol, name, exchangeShortName } = props.stock
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
    <tr className='search-row' onClick={() => handleClick(symbol)}>
      <td className='search-cell'>{symbol}</td>
      <td className='search-cell2'>{name}</td>
      <td className='search-cell'>{exchangeShortName}</td>
    </tr>
  )
}
