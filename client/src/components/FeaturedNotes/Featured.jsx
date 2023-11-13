import React, { useContext, useEffect, useState } from "react";
import "./Featured.scss";
import { NotesContext } from "../../context/notes/NotesContext";
import { AuthContext } from "../../context/user/UserContext";
import { Link } from "react-router-dom";
import { EditNote } from "@mui/icons-material";
function Featured() {
  const { notes } = useContext(NotesContext);
  const { user } = useContext(AuthContext);
  const [featureNotes, setFNotes] = useState([]);
  useEffect(() => {
    setFNotes(notes.slice(0, Math.min(4, notes.length)));
  }, [user, notes]);
  return (
    <div className="featured-container">
      {featureNotes.length &&
        featureNotes.map(
          (note, ind) =>
            note && (
              <div
                className="card"
                key={ind}
                style={{
                  background: `linear-gradient(
                to right,
                rgba(59, 59, 59, 0.7),
                rgba(60, 59, 59, 0.2)
              ),
              url(${require(`../../assets/IMGS/${ind + 1}.jpg`)}) center top`,
                }}
              >
                <div className="card-title">{note.title}</div>
                <div className="card-urls">
                  {note.url.map((url, ind) => (
                    <span key={url}>{url}</span>
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
                <div className="card-open">
                  <Link
                    to={`/view/${note._id}`}
                    state={{ note: note }}
                    className="view link"
                  >
                    view
                  </Link>
                  <Link
                    to={`/edit/${note._id}`}
                    state={{ note: note }}
                    className="edit link"
                  >
                    <EditNote />
                  </Link>
                </div>
              </div>
            )
        )}
    </div>
  );
}

export default Featured;
