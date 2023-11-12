import React from "react";
import { Link } from "react-router-dom";
import "./SearchPopUp.scss";

function SearchItem({ item }) {
  const { title, link, snippet, pagemap } = item;
  const thumbnailUrl =
    pagemap && pagemap.cse_thumbnail && pagemap.cse_thumbnail.length > 0
      ? pagemap.cse_thumbnail[0].src
      : "";
  return (
    <div className="search-result">
      <div className="content">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="title"
        >
          {title}
        </a>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="url-link"
        >
          {link}
        </a>
        <div className="col">
          <a href={link}>
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="Thumbnail" className="thumbnail" />
            )}
          </a>
          <p className="snippet">{snippet}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
