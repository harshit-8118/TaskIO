import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import "./AllNote.scss";
import { NotesContext } from "../context/notes/NotesContext";
import { deleteNote } from "../context/notes/NotesApi";
import { AuthContext } from "../context/user/UserContext";
import { Check } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";
import { DeleteOutline } from "@mui/icons-material";
import { OpenInNew } from "@mui/icons-material";

function AllNotes() {
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const { notes, dispatch } = useContext(NotesContext);
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
            {params.row.url.map((url, ind) => (
              <button key={ind} type="url-button">
                {url}
              </button>
            ))}
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
              <OpenInNew className="ico" />
            </Link>
            <Link to={`/notes/${params.row._id}`} state={{ note: params.row }}>
              <button className="noteEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="deleteNote"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="notes-grid-table">
        <DataGrid
          rows={notes}
          columns={columns}
          getRowId={(r) => (r ? r._id : "")}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 15, 20]}
        />
      </div>
    </div>
  );
}

export default AllNotes;
