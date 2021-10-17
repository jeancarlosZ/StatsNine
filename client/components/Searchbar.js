import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchSearchQuery } from '../api/api'
import SearchIcon from '../assets/icons/saved_search'
import { loadStockProfile, setCurrentStock } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Searchbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const [stocksList, setStocksList] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    // This function closes the search query box if a mouseclick occurs outside search bar and search query box.
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
    // This function sets the query results from the API up to a specified limit in the local state to be used for rendering.
    async function getStocksList() {
      try {
        setStocksList(await fetchSearchQuery(query, 7))
      } catch (err) {
        console.log(err)
      }
    }

    getStocksList()
  }, [query])

  // This function clears the input, closes the search query box, sets the selected stock in the redux store,
  // and sends the user to the overview page loaded with information for the selected stock if 'Enter' key
  // is pressed and the search value matches a symbol, which has length of at least one character.
  async function attemptSearch(event) {
    try {
      const value = event.target.value.toUpperCase()
      if (event.key !== 'Enter') return
      if (value.length >= 1) {
        // map the search results, find the one that includes your query ".."
        if (stocksList.map(stock => stock.symbol).includes(value)) {
          toast.success('Success!')
          await setQuery('')
          await setOpen(false)
          // update the current stock
          await dispatch(setCurrentStock(value))
          await loadStockProfile()
          await history.push('/overviewpage')
        } else {
          toast.error('Not Found!')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // This function sets the query value to the input.  The query value is used to render results for the search query box.
  function handleChange(event) {
    const value = event.target.value.toUpperCase()
    if (value.length >= 0 && !open) setOpen(true)
    if (!value && open) setOpen(false)

    setQuery(value)
  }

  return (
    <div ref={searchRef}>
      <div className="top-search-bar">
        <SearchIcon className="search-icon" />
        <label className="search-clear" type="button" onClick={() => setQuery('')}>
          Clear
        </label>
        <input
          className="top-search-input"
          placeholder="Search by Symbol"
          onKeyDown={event => attemptSearch(event)}
          onChange={event => handleChange(event)}
          onClick={event => {
            if (event.target.value) setOpen(true)
          }}
          value={query}
          maxLength={5}
        />
      </div>
      <ToastContainer theme="dark" newestOnTop autoClose={3000} />
      {queryBox(query, setOpen, stocksList, open)}
    </div>
  )
}

// This function returns the query box for rendering after user clicks on the search bar and types the first character.
function queryBox(query, setOpen, stocksList, open) {
  if (open) {
    return <SearchTable query={query} open={setOpen} stocksList={stocksList} />
  } else {
    return <></>
  }
}
