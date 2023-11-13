import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { taskSchema } from "../../validationSchemas/ValidateSchema";
import { AuthContext } from "../../context/user/UserContext";
import "./TaskComp.scss";
import {
  Clear,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { createNote } from "../../context/notes/NotesApi";
import { NotesContext } from "../../context/notes/NotesContext";

function TaskComp() {
  const { user, dispatch: userDispatch } = useContext(AuthContext);
  const [urls, setUrls] = useState([]);
  const [important, setImportant] = useState(false);
  const [completionTime, setCompletionTime] = useState("");
  const { dispatch } = useContext(NotesContext);
  const [message, setMessage] = useState("");
  const initialValues = {
    title: "",
    description: "",
    url_text: "",
    done: false,
    admin_id: user._id,
    important: false,
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
        done: values.done,
        important: important,
        admin_id: values.admin_id,
        url: urls,
        completionDate: completionTime,
      };
      setMessage("Adding Task...");
      createNote(obj, user, dispatch, userDispatch)
        .then((resp) => {
          setMessage("Task Added Successfully.");
        })
        .catch((err) => {
          setMessage("Failed to save Task.");
        })
        .finally(() => {
          setTimeout(() => {
            setMessage("");
          }, 2000);
          action.resetForm({
            title: "",
            description: "",
            url_text: "",
            done: false,
            admin_id: user._id,
            important: false,
          });
          setImportant(false);
          setCompletionTime("");
          setUrls([]);
        });
    },
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleUrlTextKeyPress = (e) => {
    if (e.key === "Enter" && values.url_text.trim().length > 0) {
      setUrls([...urls, values.url_text]);
      setFieldValue("url_text", "");
    }
  };
  const deleteUrl = (e) => {
    const newUrls = urls.filter((val, ind) =>
      e.target.id !== val + ind ? e.target : null
    );
    setUrls(newUrls);
  };

  const handleDate = (e) => {
    const inputDate = new Date(e.target.value);
    const currentDate = new Date();
    const formattedDate = inputDate.toISOString().split("T")[0];
    if (inputDate >= currentDate) {
      setCompletionTime(formattedDate);
    } else if (
      inputDate.toISOString().split("T")[0] ===
      currentDate.toISOString().split("T")[0]
    ) {
      setCompletionTime(formattedDate);
    }
  };

  return (
    <div className="TaskComponent">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-block">
          <input
            type="text"
            name="title"
            id="title"
            className="title"
            autoComplete="off"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            maxLength={100}
          />
          {touched.title && errors.title ? (
            <p className="form-error">{errors.title}</p>
          ) : null}
        </div>
        <div className="input-block">
          <textarea
            type="text"
            name="description"
            onKeyPress={handleKeyPress}
            id="description"
            autoComplete="off"
            placeholder="Add description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={2000}
          />
          {touched.description && errors.description ? (
            <p className="form-error">{errors.description}</p>
          ) : null}
        </div>
        <div className={urls.length ? `input-block` : `hidden`}>
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

        <div className="input-block" onKeyPress={handleKeyPress}>
          <input
            type="text"
            name="url_text"
            id="url_text"
            autoComplete="off"
            placeholder="url texts"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url_text}
            onKeyUp={handleUrlTextKeyPress}
          />
          {touched.url_text && errors.url_text ? (
            <p className="form-error">{errors.url_text}</p>
          ) : null}
        </div>
        <div className="input-block important-mark-date">
          <span
            className="important-mark"
            onClick={() => setImportant(!important)}
          >
            {important ? (
              <RadioButtonChecked className="selected" />
            ) : (
              <RadioButtonUnchecked />
            )}
            <span>important</span>
          </span>
          <input
            className="task-completion-date"
            type="date"
            name="date"
            value={completionTime}
            onChange={handleDate}
            min={new Date().toISOString().split("T")[0]}
            id="date"
          />
        </div>
        <p className={message ? "message" : "message-hidden"}>{message}</p>
        <button className="addTaskButton" type="submit">
          ADD NEW TASK
        </button>
      </form>
    </div>
  );
}

export default TaskComp;
