import React, { useContext, useState } from "react";
import "./Footer.scss";
import { AuthContext } from "../../context/user/UserContext";
import { LinkedIn, Telegram, WhatsApp } from "@mui/icons-material";
import { useFormik } from "formik";
import { commentSchema } from "../../validationSchemas/ValidateSchema";
import axios from "axios";
import { baseUrl } from "../../App";
import { Link } from "react-router-dom";

function Footer() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const initialvalue = {
    comment_text: "",
  };
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: initialvalue,
    validationSchema: commentSchema,
    validateOnChange: true,
    onSubmit: async (values, action) => {
      const comment = {
        user_email: user.email,
        user_id: user._id,
        comment_text: values.comment_text,
      };
      setMessage("Sending...");
      await axios
        .post(`${baseUrl}message/comment`, comment, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accesstoken,
          },
        })
        .then((resp) => {
          setMessage("Sent");
        })
        .catch((err) => {
          setMessage("Can't send");
        })
        .finally(() => {
          action.resetForm({
            comment_text: "",
          });
          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
    },
  });
  return (
    <div className="footer">
      {message ? <p className="footer-msg">{message}</p> : null}
      <div className="comment-form-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          <Link className="footer-heading">Drop us a line: </Link>
          <input type="text" value={user && user.username} disabled />
          <div className="input-form">
            <textarea
              type="text"
              name="comment_text"
              id="comment_text"
              autoComplete="off"
              placeholder="Comment here..."
              value={values.comment_text}
              onChange={handleChange}
              maxLength={2000}
            ></textarea>
            {touched.comment_text && errors.comment_text ? (
              <p className="form-error">{errors.comment_text}</p>
            ) : null}
          </div>
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="footer-body">
        <p className="footer-heading">Connect with us: </p>
        <div className="social-links">
          <Link className="link" to={''}>
            <LinkedIn />
          </Link>
          <Link className="link" to={''}>
            <WhatsApp />
          </Link>
          <Link className="link" to={''}>
            <Telegram />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
