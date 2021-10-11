import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchSearchQuery } from '../api/api'
import SearchIcon from '../assets/icons/saved_search'
import { setCurrentStock } from '../store/local/localActions'
import SearchTable from './searchoverlay/SearchTable'

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
          //* map over the stocks,
          if (stocksList.map(stock => stock.symbol).includes(value)) {
            event.target.value = ''
            await setOpen(false) //* this needs symbol & company name
            await dispatch(setCurrentStock(value, 'TEST'))
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
      <div className="top-search-bar">
        <input
          className="top-search-input"
          placeholder="Search by Symbol"
          onKeyDown={event => attemptSearch(event)}
          onChange={event => handleChange(event)}
          onClick={() => setOpen(true)}
        />
        <SearchIcon className="search-icon" />
      </div>
      {open ? <SearchTable query={query} close={setOpen} stocksList={stocksList} /> : ''}
    </div>
  )
}

{
  /* <div className="input-group search-area ml-auto d-inline-flex">
<input type="text" className="form-control" placeholder="Search here" spellcheck="false" data-ms-editor="true">
<div class="input-group-append">
<button type="button" className="input-group-text"><i className="flaticon-381-search-2"></i></button>
</div>

</div> */
  //   <div>
  //     <div className='top-search-bar'>
  //      <input
  //      className='top-search-input'
  //    placeholder='Search by Symbol'
  //       onKeyDown={event => attemptSearch(event)}
  //        onChange={event => handleChange(event)}
  //          onClick={() => setOpen(true)}
  //        />
  //      </div>
  //      {open ? <SearchTable query={query} close={setOpen} stocksList={stocksList} /> : ''}
  //    </div>
  //  )
}
