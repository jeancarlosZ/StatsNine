import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTickerSymbol } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'

export default function Searchbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('bitcoin')
  const dispatch = useDispatch()
  const history = useHistory()

  async function attemptSearch(event) {
    try {
      const value = event.target.value.toUpperCase()
      if (event.key !== 'Enter') {
        return
      } else {
        if (value.length >= 1) {
          event.target.value = ''
          await setOpen(false)
          await dispatch(setTickerSymbol(value))
          await history.push('/overviewpage')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(event) {
    const value = event.target.value
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
      {open ? <SearchTable query={query} close={setOpen} /> : ''}
    </div>
  )
}
