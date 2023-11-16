import "../../GlobalCSS.scss";
import { Clear } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../validationSchemas/ValidateSchema";
import axios from "axios";
import { baseUrl } from "../../App";
import { AuthContext } from "../../context/user/UserContext";
import { useNavigate } from "react-router-dom";

function ResetPass() {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    username: user ? user.username: "",
    password: "",
    email: user ? user.email: "",
    confirm_password: "",
  };
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      setMessage("password updating...");
      try {
        const {confirm_password, ...obj} = values;
        console.log(obj)
        axios.put(baseUrl + 'auth/resetpass', obj).then(() => {
          setMessage("password updated successfully, please login");
        }).catch(err => setMessage("wrong username or email"));
      } catch (err) {
        setMessage("wrong username of email");
      } finally {
        setTimeout(() => {
          setMessage("");
          navigate('/');
        }, 3000);
      }

      action.setFieldValue("username", values.username);
      action.setFieldValue("email", values.email);
      action.setFieldValue("password", "");
      action.setFieldValue("confirm_password", "");
    },
  });

  return (
    <div className="login-register-box">
      {message && <p className="message">{message}</p>}
      <form className="loginModal" onSubmit={handleSubmit}>
        <h2>Reset password</h2>
        <div className="input-block">
          <input
            type="username"
            autoComplete="off"
            name="username"
            id="username"
            placeholder="Existing username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            />
          {touched.username && errors.username ? (
            <p className="form-error">{errors.username}</p>
            ) : null}
        </div>
        <div className="input-block">
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Existing email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          {touched.email && errors.email ? (
            <p className="form-error">{errors.email}</p>
            ) : null}
        </div>
        <div className="input-block">
          <input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="new password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          {errors.password && touched.password ? (
            <p className="form-error">{errors.password}</p>
            ) : null}
        </div>
        <div className="input-block">
          <input
            type="password"
            autoComplete="off"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm new password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_password && touched.confirm_password ? (
            <p className="form-error">{errors.confirm_password}</p>
          ) : null}
        </div>
        <div className="modal-buttons">
          <button className="input-button" type="submit">
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPass;
