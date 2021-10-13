import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadStockProfile, setCurrentStock } from '../../store/local/localActions'

export default function SearchRow(props) {
  const { symbol, name, exchangeShortName } = props.stock
  const dispatch = useDispatch()
  const history = useHistory()
  const open = props.open

  // This function closes the query search box, sets the selected stock in the redux store, and sends the user to the overviewpage loaded with information for the selected stock when a stock is clicked on the search query box.
  async function handleClick(symbol) {
    try {
      await open(false)
      await dispatch(setCurrentStock(symbol, name))
      await loadStockProfile()
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
