import React, { useState } from "react";
import SearchItem from "./SearchItem";
import { Clear, RotateRight } from "@mui/icons-material";
import "./SearchPopUp.scss";
function SearchPopUp({ searchResults, setSearchResults, setSearchOpen }) {
  return (
    <div className="search-pop-container">
      <span
        onClick={() => {
          setSearchResults([]);
          setSearchOpen((prev) => !prev);
        }}
      >
        <Clear />
      </span>
      <div className="search-items-container">
        <div className="search-web-results">
          <p className="web">Web</p>
          <p>
            results (.{searchResults.length && Math.floor(Math.random() * 100)}{" "}
            seconds)
          </p>
        </div>
        {!searchResults.length ? <RotateRight className="animate" /> : null}
        {searchResults &&
          searchResults.map((item, ind) => <SearchItem item={item} />)}
      </div>
    </div>
  );
}

export default SearchPopUp;
