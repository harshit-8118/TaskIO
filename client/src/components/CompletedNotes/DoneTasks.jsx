import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { NotesContext } from "../../context/notes/NotesContext";
import { deleteNote } from "../../context/notes/NotesApi";
import { AuthContext } from "../../context/user/UserContext";
import { Check } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";
import { DeleteOutline, OpenInNew, EditNote } from "@mui/icons-material";

function DoneTasks() {
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const { notes, dispatch } = useContext(NotesContext);
  const don = useLocation().state.don;
  const [completedNotes, setCNotes] = useState([]);
  useEffect(() => {
    const CN = notes.filter((note) => {
      if (note.done == don) {
        return note;
      }
    });
    setCNotes(CN);
  }, [don]);

  const handleDelete = (noteId) => {
    if (window.confirm(`${noteId} will be deleted.`)) {
      deleteNote(noteId, dispatch, user, userDispatch);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "description",
      headerName: "Description",
      width: "300",
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
      width: "300",
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
        <DataGrid
          rows={completedNotes}
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

export default DoneTasks;
