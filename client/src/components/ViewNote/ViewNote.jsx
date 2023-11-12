import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./ViewNote.scss";
import {
  CheckCircle,
  CheckCircleOutline,
  DeleteOutline,
  EditNote,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { deleteNote } from "../../context/notes/NotesApi";
import { NotesContext } from "../../context/notes/NotesContext";
import { AuthContext } from "../../context/user/UserContext";
import axios from "axios";
import SearchPopUp from "../SearchPopUP/SearchPopUp";

function ViewNote() {
  const note = useLocation().state.note;
  const navigate = useNavigate();
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const { dispatch } = useContext(NotesContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const handleDelete = (noteId) => {
    if (window.confirm(`${noteId} will be deleted.`)) {
      deleteNote(noteId, dispatch, user, userDispatch);
      navigate("/allnotes");
    }
  };

  const handleSearch = async (e) => {
    const searchQuery = e.target.childNodes[0].data;
    try {
      const apiKey = process.env.REACT_APP_CUSTOM_SEARCH_API_KEY;
      const cseId = process.env.REACT_APP_SEARCH_ENGINE_ID;
      setSearchOpen(true);
      await axios
        .get(
          `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${searchQuery}`
        )
        .then((resp) => {
            setSearchResults(resp.data.items);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="view-container">
      <div
        className={`pop-search-qry${
          searchOpen ? " open" : ""
        }`}
      >
        {searchOpen && <SearchPopUp searchResults={searchResults} setSearchResults={setSearchResults} setSearchOpen={setSearchOpen} />}
      </div>
      <div className="view-note-container">
        <div className="title-imp-done">
          <div className="title">{note.title}</div>
          <div className="imp-done">
            <div className="imp">
              {note.important ? (
                <span className="outer-box" id="imp">
                  Important
                  <span className="inner-box">
                    <Star className="ico" />
                  </span>
                </span>
              ) : (
                <span className="outer-box">
                  Not important
                  <span className="inner-box">
                    <StarOutline className="ico" />
                  </span>
                </span>
              )}
            </div>
            <div className="done">
              {note.done ? (
                <span className="outer-box" id="done">
                  Done
                  <span className="inner-box">
                    <CheckCircle className="ico" />
                  </span>
                </span>
              ) : (
                <span className="outer-box" id="not-done">
                  Incomplete
                  <span className="inner-box">
                    <CheckCircleOutline className="ico" />
                  </span>
                </span>
              )}
            </div>

            <span className="noteDelBtn" onClick={() => handleDelete(note._id)}>
              <abbr title="Delete">
                <DeleteOutline />
              </abbr>
            </span>
            <Link
              to={`/edit/${note._id}`}
              state={{ note: note }}
              className="noteEditBtn"
            >
              <abbr title="Edit">
                <EditNote />
              </abbr>
            </Link>
          </div>
        </div>
        <div className="urls-box">
          {note.url.map((url, ind) => (
            <button key={ind} onClick={handleSearch}>
              {url}
            </button>
          ))}
        </div>
        <div className="description">{note.description}</div>
      </div>
    </div>
  );
}

export default ViewNote;
