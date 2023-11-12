import React, { useContext, useEffect, useState } from "react";
import "./Landing.scss";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { AuthContext } from "../../context/user/UserContext";

function Landing() {
  const [loginBtn, setLoginBtn] = useState(false);
  const [registerBtn, setRegisterBtn] = useState(false);
  const {user} = useContext(AuthContext);
  
  useEffect(()=>{
    if(user){
      setLoginBtn(false);
      setRegisterBtn(false);
    }
  }, [user])
  return (
    <div className="landing">
      <div
        className={`pop-login-register${
          loginBtn || registerBtn ? " open" : ""
        }`}
      >
        {loginBtn && <Login loginBtn={loginBtn} registerBtn={registerBtn} setLoginBtn={setLoginBtn} setRegisterBtn={setRegisterBtn} />}
        {registerBtn && <Register loginBtn={loginBtn} registerBtn={registerBtn} setLoginBtn={setLoginBtn} setRegisterBtn={setRegisterBtn} />}
      </div>
      <div className="landing-header">
        <div className="navbar">
          <div className="navbar-left">
            <img src="https://www.klipfolio.com/sites/default/files/partners/logo-taskio_0.png" alt="TASKIO" />
          </div>
          <div className="navbar-right">
            <button
              className="login-btn"
              onClick={() => {
                registerBtn && setRegisterBtn(!registerBtn);
                setLoginBtn(!loginBtn);
              }}
            >
              Login
            </button>
            <button
              className="register-btn"
              onClick={() => {
                loginBtn && setLoginBtn(!loginBtn);
                setRegisterBtn(!registerBtn);
              }}
            >
              Register
            </button>
            <span></span>
          </div>
        </div>
      </div>
      <div className="landing-body">
        <h1>Manage your notes with TaskIO.</h1>
        <div className="demo-cards">
          <div className="card">
            <img
              src={require('../../assets/IMGS/1.png')}
              alt="card"
            />
          </div>
          <div className="card">
            <img
              src={require('../../assets/IMGS/2.png')}
              alt="card"
            />
          </div>
          <div className="card">
            <img
              src={require('../../assets/IMGS/3.png')}
              alt="card"
            />
          </div>
          <div className="card">
            <img
              src={require('../../assets/IMGS/4.png')}
              alt="card"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
