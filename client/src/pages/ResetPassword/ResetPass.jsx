import "../../GlobalCSS.scss";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../validationSchemas/ValidateSchema";
import axios from "axios";
import { baseUrl } from "../../App";
import { AuthContext } from "../../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function ResetPass() {
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);
  const auth = getAuth();
  const gauthProvider = new GoogleAuthProvider();

  const initialValues = {
    password: "",
    email: user ? user.email : "",
    confirm_password: "",
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
    validateOnBlur: true,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      setMessage("password updating...");
      try {
        axios
          .put(baseUrl + "auth/resetpass", {
            username: values.email.split("@")[0],
            email: values.email,
            password: values.password,
          })
          .then(() => {
            setMessage("password updated successfully, please login");
          })
          .catch((err) => setMessage("invalid credentials"));
      } catch (err) {
        setMessage("Failed to reset, Try again.");
      } finally {
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      }

      action.setFieldValue("email", values.email);
      action.setFieldValue("password", "");
      action.setFieldValue("confirm_password", "");
    },
  });
  const handleResetWithGoogle = () => {
    try {
      signInWithPopup(auth, gauthProvider)
        .then((res) => {
          setResetForm(true);
          values.email = res.user.email;
        })
        .catch((err) => {});
    } catch (err) {}
  };
  return (
    <div className="login-register-box">
      {message && <p className="message">{message}</p>}
      {resetForm ? (
        <form className="loginModal" onSubmit={handleSubmit}>
          <h2>Reset password</h2>
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
              disabled={values.email ? true : false}
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
      ) : (
        <div className="google-register">
          <button onClick={handleResetWithGoogle}>
            <img src={require("../../assets/IMGS/5.png")} alt="" />
            <p>Reset Password</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPass;
