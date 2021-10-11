import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTickerSymbol } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'
import { fetchSearchQuery } from '../api/api'

export default function Searchbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('bitcoin')
  const dispatch = useDispatch()
  const history = useHistory()
  const [stocksList, setStocksList] = useState([])

  useEffect(() => {
    async function getStocksList() {
      try {
        setStocksList(await fetchSearchQuery(query, 20))
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [query])

  async function attemptSearch(event) {
    try {
      const value = event.target.value.toUpperCase()
      if (event.key !== 'Enter') {
        return
      } else {
        if (value.length >= 1) {
          if (stocksList.map(stock => stock.symbol).includes(value)) {
            event.target.value = ''
            await setOpen(false)
            await dispatch(setTickerSymbol(value))
            await history.push('/overviewpage')
          } else {
            alert('Symbol not found!')
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(event) {
    const value = event.target.value.toUpperCase()
    if (value.length >= 1) {
      setQuery(value)
    }
  }

  return (
    <div>
      <div className='top-search-bar'>
        <input
          className='top-search-input'
          placeholder='Search by Symbol'
          onKeyDown={event => attemptSearch(event)}
          onChange={event => handleChange(event)}
          onClick={() => setOpen(true)}
        />
      </div>
      {open ? <SearchTable query={query} close={setOpen} stocksList={stocksList} /> : ''}
    </div>
  )
}
