import React from 'react'
import SearchIcon from '../assets/icons/saved_search'

export default function Searchbar() {
  async function attemptSearch(event) {
    const value = event.target.value
    if (event.key !== 'Enter') {
      return
    } else {
      if (value.length >= 1) {
        console.log(
          'Make API call for selected value and take user to overview page for that particular value.'
        )
      }
    }
  }

  async function handleChange(event) {
    const value = event.target.value
    if (value.length >= 1) {
      console.log('Make API call to display query results.')
    }
  }

  return (
    <div className="top-search-bar">
      <input
        className="top-search-input"
        placeholder="Search"
        onKeyDown={event => attemptSearch(event)}
        onChange={event => handleChange(event)}
      />
      <SearchIcon className="search-icon" />
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
}
