import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchSearchQuery } from '../api/api'
import SearchIcon from '../assets/icons/saved_search'
import { setCurrentStock } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Searchbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('a')
  const dispatch = useDispatch()
  const history = useHistory()
  const [stocksList, setStocksList] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    // This function closes the search query box if a mouseclick occurs outside search bar or search query box.
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
    // This function sets the query results up to 20 in the local state to be used for rendering.  It uses information from the API call.
    async function getStocksList() {
      try {
        setStocksList(await fetchSearchQuery(query, 20))
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [query])

  // This function closes the search query box, sets the selected stock in the redux store, and sends the user to the overview page loaded with information for the selected stock if 'Enter' key is pressed and the search value matches a symbol and has length of at least one character.
  async function attemptSearch(event) {
    try {
      const value = event.target.value.toUpperCase()
      if (event.key !== 'Enter') {
        return
      } else {
        if (value.length >= 1) {
          if (stocksList.map(stock => stock.symbol).includes(value)) {
            event.target.value = ''
            toast.success('Symbol Found!')
            await setOpen(false)
            await dispatch(setCurrentStock(value))
            await history.push('/overviewpage')
          } else {
            toast.error('Symbol Not Found!')
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // This function sets the value of the search bar to local state if it has at least one character.  The query value is used to render results for the search query box.
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
      <ToastContainer theme='dark' />
      {open ? <SearchTable query={query} close={setOpen} stocksList={stocksList} /> : ''}
    </div>
  )
}
