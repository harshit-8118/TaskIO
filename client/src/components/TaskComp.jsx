import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { taskSchema } from "../validationSchemas/ValidateSchema";
import { AuthContext } from "../context/user/UserContext";

function TaskComp() {
  const { user } = useContext(AuthContext);
  const [urls, setUrls] = useState([]);
  const [important, setImportant] = useState(false);

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
        
    },
  });
  const handleUrlTextKeyPress = (e) => {
    if (e.key === "Enter" && values.url_text.length > 0) {
      setUrls([...urls, values.url_text]);
      setFieldValue("url_text", "");
    }
  };
  const deleteUrl = (e) => {
    const newUrls = urls.filter((val, ind) =>
      e.target.id != val + ind ? e.target : null
    );
    setUrls(newUrls);
  };

  return (
    <div className="TaskComponent">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-block">
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="off"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.title && errors.title ? (
            <p className="form-error">{errors.title}</p>
          ) : null}
        </div>
        <div className="input-block">
          <input
            type="text"
            name="description"
            id="description"
            autoComplete="off"
            placeholder="Add description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.description && errors.description ? (
            <p className="form-error">{errors.description}</p>
          ) : null}
        </div>
        <div>
          <ul>
            {urls.map((url, ind) => (
              <button key={url + ind}>
                {url}
                <button id={url + ind} onClick={deleteUrl}>
                  click
                </button>
              </button>
            ))}
          </ul>
        </div>

        <div className="input-block">
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
        <div className="input-block">
          important{" "}
          <span onClick={() => setImportant(!important)}>
            {important ? 1 : 0}
          </span>
        </div>
        <button className="addTaskButton" type="submit">
            Add New Task
        </button>
      </form>
    </div>
  );
}

export default TaskComp;
