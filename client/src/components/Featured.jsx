import React, { useContext, useEffect, useState } from "react";
import "./Featured.scss";
import { NotesContext } from "../context/notes/NotesContext";
import { AuthContext } from "../context/user/UserContext";
import { Link } from "react-router-dom";
function Featured() {
  const { notes, dispatch } = useContext(NotesContext);
  const { user } = useContext(AuthContext);
  const [featureNotes, setFNotes] = useState([]);
  useEffect(() => {
    setFNotes(notes.slice(0, Math.min(4, notes.length)));
  }, [user, notes]);
  return (
    <div className="featured-container">
      {featureNotes.length && featureNotes.map((note, ind) => (
        note && <div className="card" key={ind}>
          <div className="card-title">{note.title}</div>
          <div className="card-urls">
            {note.url.map((url) => (
              <span>{url}</span>
            ))}
          </div>
          <div className="imp-done-box">
            <div
              className={
                note.important ? "card-important" : "card-not-important"
              }
            >
              {note.important ? "Important" : "Not important"}
            </div>
            <div className={note.done ? "card-done" : "card-not-done"}>
              {note.done ? "Done" : "Incomplete"}
            </div>
          </div>
          <Link to={`/view/${note._id}`} state={{note: note}} className="card-open link">
            view
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Featured;
