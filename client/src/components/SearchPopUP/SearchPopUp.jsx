import React, { useState } from 'react'
import SearchItem from './SearchItem'
import { Clear } from '@mui/icons-material';
import './SearchPopUp.scss';
function SearchPopUp({searchResults, setSearchOpen}) {
    console.log(searchResults)
  return (
    <div className='search-pop-container'>
        <span onClick={() => setSearchOpen(prev=>!prev)}>
          <Clear />
        </span>
        <div className="search-items-container">
          <div className="search-web-results">
            <p className='web'>Web</p>
            <p>results (0.25 seconds)</p>
          </div>
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
