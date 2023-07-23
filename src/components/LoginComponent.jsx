import React, { useState, useEffect } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import logo from "../assets/logo.png";
import img from "../assets/online-02.jpg";
import Navbar from "../components/common/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import "../Sass/LoginComponent.scss";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Logged in Successfully");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Invalid user");
    }
  };
0
 

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <img className="login-image" src={img} alt="iphone-mockup" />
        <Navbar className="navbar" />
        <div className="login-wrapper-inner">
         
          <div className="login-right">
            <h1 className="headings"></h1>

            <p className="sub-heading">Keep Exploring!</p>

            <div className="auth-inputs">
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, email: event.target.value })
                }
                type="email"
                className="common-input"
                placeholder="Email"
              />
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, password: event.target.value })
                }
                type="password"
                className="common-input"
                placeholder="Password"
              />
            </div>
            <button onClick={login} className="login-btn">
              Login
            </button>
          </div>
          
            <p className="go-to-signup">
              New User?
              <span className="join-now" onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          </div>
        </div>
    
    </div>
  );
}
