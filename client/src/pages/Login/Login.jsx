import "../../GlobalCSS.scss";
import { Clear } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validationSchemas/ValidateSchema";
import { login_user } from "../../context/user/UserApi";
import { AuthContext } from "../../context/user/UserContext";
import ResetPass from "../ResetPassword/ResetPass";
import { Link } from "react-router-dom";

function Login({ loginBtn, registerBtn, setLoginBtn, setRegisterBtn }) {
  const { user, dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (loginBtn || registerBtn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loginBtn, registerBtn]);
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
      setMessage("Fetching info...");
      login_user(values, dispatch)
        .then((resp) => {
          setMessage("Login success.");
        })
        .catch((err) => {
          setMessage("Login failed.");
        })
        .finally(() => {
          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
      action.setFieldValue("username", values.username);
      action.setFieldValue("password", values.password);
    },
  });

  useEffect(() => {
    if (user) {
      setDisable(true);
      setMessage("Already Login");
    } else {
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
        <div className="login-sign-up">
          <div>
            Forgotten password?{" "}
            <Link
              to={"/resetpass"}
              className="link"
              style={{ color: "red", margin: "0px 5px", cursor: "pointer" }}
            >
              Reset password
            </Link>
          </div>
          <div>
            Don't have an account?{" "}
            <button
              onClick={() => {
                loginBtn && setLoginBtn(!loginBtn);
                setRegisterBtn(!registerBtn);
              }}
            >
              Register now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
