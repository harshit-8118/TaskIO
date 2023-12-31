import "../../GlobalCSS.scss";
import { Clear } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../validationSchemas/ValidateSchema";
import axios from "axios";
import { baseUrl } from "../../App";
import { AuthContext } from "../../context/user/UserContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Register({ loginBtn, registerBtn, setLoginBtn, setRegisterBtn }) {
  const [buttonContent, setButtonContent] = useState("Register");
  const [message, setMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const [disable, setDisable] = useState(false);
  const [regForm, setregForm] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const auth = getAuth();
  const gauthProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (user) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [user]);

  const initialValues = {
    password: "",
    email: "",
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
    validationSchema: registerSchema,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setMessage("");
      setButtonContent("sending info...");
      try {
        await axios.post(baseUrl + "user/register", {
          username: values.email.split("@")[0],
          email: values.email,
          password: values.password,
          profile_pic: profilePic,
        });
        setButtonContent("Registered, Login please..");
        setRegisterBtn(!registerBtn);
        setLoginBtn(!loginBtn);
      } catch (err) {
        setMessage("Account already exists...");
        setButtonContent("Register");
      }

      action.setFieldValue("email", values.email);
      action.setFieldValue("password", "");
      action.setFieldValue("confirm_password", "");
    },
  });
  const handleRegisterWithGoogle = () => {
    try {
      signInWithPopup(auth, gauthProvider)
        .then((res) => {
          setregForm(true);
          values.email = res.user.email;
          setProfilePic(res.user.photoURL);
        })
        .catch((err) => {});
    } catch (err) {}
  };
  return (
    <div className="login-register-box">
      <span onClick={() => setRegisterBtn(!registerBtn)}>
        <Clear />
      </span>
      {regForm ? (
        <form className="loginModal" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-block">
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disable || values.email}
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
          <div className="input-block">
            <input
              type="password"
              autoComplete="off"
              name="confirm_password"
              id="confirm_password"
              placeholder="confirm password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disable}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>
          <div className="modal-buttons">
            <p>{message}</p>
            {disable && <p>You are already login!!</p>}

            <button className="input-button" type="submit" disabled={disable}>
              {buttonContent}
            </button>
          </div>
          <p className="login-sign-up">
            Already have an account?{" "}
            <button
              onClick={() => {
                registerBtn && setRegisterBtn(!registerBtn);
                setLoginBtn(!loginBtn);
              }}
            >
              Login
            </button>
          </p>
        </form>
      ) : (
        <div className="google-register">
          <button onClick={handleRegisterWithGoogle}>
            <img src={require("../../assets/IMGS/5.png")} alt="" />
            <p>Sign up with google</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Register;
