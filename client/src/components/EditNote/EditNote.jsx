import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./EditNote.scss";
import {
  CheckCircle,
  CheckCircleOutline,
  Clear,
  DeleteOutline,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { NotesContext } from "../../context/notes/NotesContext";
import { AuthContext } from "../../context/user/UserContext";
import { deleteNote, updateNote } from "../../context/notes/NotesApi";
import { taskSchema } from "../../validationSchemas/ValidateSchema";
import { updateUser } from "../../context/user/UserApi";

function EditNote() {
  const {user, dispatch: userDispatch } = useContext(AuthContext);
  const note = useLocation().state.note;
  const [done, setDone] = useState(note.done);
  const [important, setImportant] = useState(note.important);
  const [urls, setUrls] = useState(note.url);
  const [completionTime, setCompletionTime] = useState(note.completionDate);
  const { dispatch } = useContext(NotesContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = (noteId) => {
    if (window.confirm(`${noteId} will be deleted.`)) {
      deleteNote(noteId, dispatch, user, userDispatch);
      navigate('/allnotes');
    }
  }

  const initialValues = {
    title: note.title,
    important: note.important,
    done: note.done,
    url_text: "",
    description: note.description,
    completionDate: note.completionDate,
    _id: note._id
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: taskSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, action) => {
      const obj = {
        title: values.title,
        description: values.description,
        done: done,
        important: important,
        url: urls,
        completionDate: completionTime,
        _id: note._id
      };
      setMessage("updating...");
      updateNote(obj, dispatch)
        .then((resp) => {
          setMessage("Updated successfully.")
        })
        .catch((err) => {
          setMessage("Failed...")
        }).finally(() => {
          setTimeout(() => {setMessage("")}, 2000)
        });
        updateUser(user, userDispatch);
    },
  });

  const handleUrlTextKeyPress = (e) => {
    if (e.key === "Enter" && values.url_text.trim().length > 0) {
      setUrls([...urls, values.url_text]);
      setFieldValue("url_text", "");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const deleteUrl = (e) => {
    const newUrls = urls.filter((val, ind) =>
      e.target.id != val + ind ? e.target : null
    );
    setUrls(newUrls);
  };
  return (
    <div className="edit-container">
      <form className="edit-note-container" onSubmit={handleSubmit}>
        <div className="title-imp-done">
          <div className="input-block">
            <input
              type="text"
              name="title"
              id="title"
              className="title"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={handleKeyPress}
              value={values.title}
              maxLength={100}
            />
            {touched.title && errors.title ? (
              <p className="form-error">{errors.title}</p>
            ) : null}
          </div>
          <div className="imp-done">
            <div className="imp">
              {important ? (
                <span
                  className="outer-box"
                  id="imp"
                  onClick={() => setImportant(!important)}
                >
                  Important
                  <span className="inner-box">
                    <Star className="ico" />
                  </span>
                </span>
              ) : (
                <span
                  className="outer-box"
                  onClick={() => setImportant(!important)}
                >
                  Mark as important
                  <span className="inner-box">
                    <StarOutline className="ico" />
                  </span>
                </span>
              )}
            </div>
            <div className="done">
              {done ? (
                <span
                  className="outer-box"
                  id="done"
                  onClick={() => setDone(!done)}
                >
                  Done
                  <span className="inner-box">
                    <CheckCircle className="ico" />
                  </span>
                </span>
              ) : (
                <span
                  className="outer-box"
                  id="not-done"
                  onClick={() => setDone(!done)}
                >
                  Mark as done
                  <span className="inner-box">
                    <CheckCircleOutline className="ico" />
                  </span>
                </span>
              )}
            </div>
            <abbr title="Delete">
              <DeleteOutline
                className="deleteNote"
                onClick={() => handleDelete(note._id)}
              />
            </abbr>
          </div>
        </div>
        <div className={urls.length ? `urls-box input-block` : `hidden`}>
          <ul className="urls-button">
            {urls.map((url, ind) => (
              <span key={url + ind} className="outer-box">
                {url}
                <span id={url + ind} onClick={deleteUrl} className="inner-box">
                  <Clear
                    onClick={deleteUrl}
                    id={url + ind}
                    className="del-ico"
                  />
                </span>
              </span>
            ))}
          </ul>
        </div>

        <div className="input-block" onKeyUp={handleKeyPress}>
          <input
            type="text"
            name="url_text"
            id="url_text"
            autoComplete="off"
            className="url-text-box"
            placeholder="url texts"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url_text}
            onKeyDown={handleKeyPress}
            onKeyUp={handleUrlTextKeyPress}
            maxLength={300}
          />
        </div>
        <textarea
          name="description"
          id="description"
          className="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyUp={handleKeyPress}
          maxLength={2000}
        ></textarea>
        <p className={message?"message":"message-hidden"}>{message}</p>
        <button className="update-btn" type="submit">
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default EditNote;
