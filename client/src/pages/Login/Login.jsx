import "../../pages/GlobalCSS.scss";
import { Clear } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  loginSchema,
} from "../../validationSchemas/ValidateSchema";
import { login_user } from "../../context/user/UserApi";
import { AuthContext } from "../../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../context/notes/NotesContext";

function Login({ loginBtn, registerBtn, setLoginBtn, setRegisterBtn }) {
  const { user, dispatch } = useContext(AuthContext);
  const { dispatch: notesDispatch } = useContext(NotesContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [disable, setDisable] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validateOnChange: true,
    validationSchema: loginSchema,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      login_user(values, dispatch);
      setTimeout(()=>{
        setMessage("fetching info...")
      }, 100)
      setTimeout(()=>{
        setMessage("Login failed");
      }, 5000)
      setMessage("");
      action.setFieldValue("username", values.username);
      action.setFieldValue("password", "");
    },
  });

  useEffect(() => {
    if (user) {
      setDisable(true);
      setMessage("Already Login");
      navigate("/");
    }else{
      setDisable(false);
    }
  }, [user, message]);

  return (
    <div className="login-register-box">
      <span onClick={() => setLoginBtn(!loginBtn)}>
        <Clear />
      </span>
      <form className="loginModal" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-block">
          <input
            type="username"
            autoComplete="off"
            name="username"
            id="username"
            placeholder="username or email"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disable}
          />
          {touched.username && errors.username ? (
            <p className="form-error">{errors.username}</p>
          ) : null}
        </div>
        <div className="input-block">
          <input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disable}
          />
          {errors.password && touched.password ? (
            <p className="form-error">{errors.password}</p>
          ) : null}
        </div>
        <div className="modal-buttons">
          <p>{message}</p>
          <button className="input-button" type="submit" disabled={disable}>
            Login
          </button>
        </div>
        <p className="login-sign-up">
          {registerBtn}
          Don't have an account?{" "}
          <button
            onClick={() => {
              loginBtn && setLoginBtn(!loginBtn);
              setRegisterBtn(!registerBtn);
            }}
          >
            Register now
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
