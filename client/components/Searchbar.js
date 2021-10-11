import React, { useState } from 'react'
import SearchTable from './searchoverlay/SearchTable'

export default function Searchbar() {
  const [query, setQuery] = useState('bitcoin')

  function attemptSearch(event) {
    const value = event.target.value
    if (event.key !== 'Enter') {
      return
    } else {
      if (value.length >= 1) {
        console.log(
          'Make API call for selected value and take user to overview page for that particular value.',
        )
      }
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
          placeholder='Search'
          onKeyDown={event => attemptSearch(event)}
          onChange={event => handleChange(event)}
        />
      </div>
      <SearchTable query={query} />
    </div>
  )
}
