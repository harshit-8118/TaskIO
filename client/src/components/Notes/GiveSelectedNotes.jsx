import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "../AllNotes/AllNotes.scss";
import { NotesContext } from "../../context/notes/NotesContext";
import { deleteNote } from "../../context/notes/NotesApi";
import { AuthContext } from "../../context/user/UserContext";
import { Check } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";
import { DeleteOutline, OpenInNew, EditNote } from "@mui/icons-material";

function GiveSelectedNotes({ notesMark: imp_done }) {
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const { notes, dispatch } = useContext(NotesContext);
  const [message, setMessage] = useState("");
  const imp = imp_done.important;
  const done = imp_done.done;
  const [fNotes, setFNotes] = useState(notes);
  useEffect(() => {
    let fnotes = [];
    if (imp === -1 && done === 0) {
      fnotes = notes.filter((note) => !note.done);
      setFNotes(fnotes);
    } else if (imp === -1 && done === 1) {
      fnotes = notes.filter((note) => note.done);
      setFNotes(fnotes);
    } else if (imp === 0 && done === -1) {
      fnotes = notes.filter((note) => !note.important);
      setFNotes(fnotes);
    } else if (imp === 0 && done === 0) {
      fnotes = notes.filter((note) => !note.done && !note.important);
      setFNotes(fnotes);
    } else if (imp === 0 && done === 1) {
      fnotes = notes.filter((note) => note.done && !note.important);
      setFNotes(fnotes);
    } else if (imp === 1 && done === -1) {
      fnotes = notes.filter((note) => note.important);
      setFNotes(fnotes);
    } else if (imp === 1 && done === 0) {
      fnotes = notes.filter((note) => !note.done && note.important);
      setFNotes(fnotes);
    } else if (imp === 1 && done === 1) {
      fnotes = notes.filter((note) => note.done && note.important);
      setFNotes(fnotes);
    } else {
      setFNotes(notes);
    }
  }, [dispatch, notes, imp, done]);
  const handleDelete = (noteId) => {
    if (window.confirm(`${noteId} will be deleted.`)) {
      setMessage("Deleting...");
      deleteNote(noteId, dispatch, user, userDispatch)
        .then(() => {
          setMessage("Deleted Successfully.");
        })
        .catch((err) => "Deletion failed.")
        .finally(() => {
          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "description",
      headerName: "Description",
      width: "250",
    },
    {
      field: "important",
      headerName: "Important",
      width: "100",
      renderCell: (params) => {
        return (
          <div className="important">
            {params.row.important ? (
              <Check className="check-ico" />
            ) : (
              <Clear className="cross-ico" />
            )}
          </div>
        );
      },
    },
    {
      field: "done",
      headerName: "Completed",
      width: "100",
      renderCell: (params) => {
        return (
          <div className="done">
            {params.row.done ? (
              <Check className="check-ico " />
            ) : (
              <Clear className="cross-ico" />
            )}
          </div>
        );
      },
    },
    {
      field: "url",
      headerName: "Search Texts",
      width: "250",
      renderCell: (params) => {
        return (
          <div className="urls">
            {params.row.url.length ? (
              params.row.url.map((url, ind) => (
                <button key={ind} type="url-button">
                  {url}
                </button>
              ))
            ) : (
              <button type="url-button">NA</button>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: "150",
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              to={`/view/${params.row._id}`}
              state={{ note: params.row }}
              className="card-open link"
            >
              <abbr title="View">
                <OpenInNew className="ico" />
              </abbr>
            </Link>
            <Link to={`/edit/${params.row._id}`} state={{ note: params.row }}>
              <button className="noteEdit">
                <EditNote />
              </button>
            </Link>
            <abbr title="Delete">
              <DeleteOutline
                className="deleteNote"
                onClick={() => handleDelete(params.row._id)}
              />
            </abbr>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="notes-grid-table">
        {message && <p className="message">{message}</p>}
        <DataGrid
          rows={fNotes}
          columns={columns}
          getRowId={(r) => (r ? r._id : "")}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 15, 20]}
        />
      </div>
    </div>
  );
}

export default GiveSelectedNotes;
