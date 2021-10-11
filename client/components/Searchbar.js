import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchSearchQuery } from '../api/api'
import SearchIcon from '../assets/icons/saved_search'
import { setCurrentStock } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'

export default function Searchbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('a')
  const dispatch = useDispatch()
  const history = useHistory()
  const [stocksList, setStocksList] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    async function handleClickOutside(event) {
      try {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setOpen(false)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef, open])

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
            await dispatch(setCurrentStock(value))
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
    <div ref={searchRef}>
      <div className='top-search-bar'>
        <input
          className='top-search-input'
          placeholder='Search by Symbol'
          onKeyDown={event => attemptSearch(event)}
          onChange={event => handleChange(event)}
          onClick={() => setOpen(true)}
        />
        <SearchIcon className='search-icon' />
      </div>
      {open ? <SearchTable query={query} close={setOpen} stocksList={stocksList} /> : ''}
    </div>
  )
}
