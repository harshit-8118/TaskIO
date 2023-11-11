import React, { useState } from 'react'
import SearchItem from './SearchItem'

function SearchPopUp({searchResults, setSearchOpen}) {
    console.log(searchResults)
  return (
    <div className='search-pop-container'>
        <span onClick={() => setSearchOpen(prev=>!prev)}>Close</span>
        <div className="search-items-container">
            {
                searchResults && searchResults.map((item, ind) =>
                   ( <SearchItem item={item} />)
                )
            }
        </div>
      
    </div>
  )
}

export default SearchPopUp
