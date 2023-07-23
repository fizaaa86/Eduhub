import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import img from "../assets/online-02.jpg";
import Navbar from "../components/common/Navbar/Navbar";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const isValidEmailDomain = (email) => {
    const allowedDomains = ["ug.cusat.ac.in", "pg.cusat.ac.in", "cusat.ac.in"];
    const emailParts = email.split("@");
    const emailDomain = emailParts[1];
    return allowedDomains.includes(emailDomain);
  };

  const register = async () => {
    if (!isValidEmailDomain(credentials.email)) {
      toast.error("Invalid email domain. Please use 'ug.cusat.ac.in', 'pg.cusat.ac.in', or 'cusat.ac.in'");
      return;
    }

    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account created");
      localStorage.setItem("userEmail", res.user.email);
      postUserData({ name: credentials.name, email: credentials.email });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Cannot create your Account");
    }
  };

 
  return (
    <div className="login-wrapper">
      <img className="login-image" src={img} alt="iphone-mockup" />
      <div className="navbar-title">
        <Navbar />
      </div>

      <div className="login-wrapper-inner">
        <h1 className="headingr">Register</h1>
        <p className="sub-headings">Start Exploring!</p>

        <div className="auth-inputs">
          <input
            onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
            type="text"
            className="common-input"
            placeholder="Name"
          />

          <input
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
            type="email"
            className="common-input"
            placeholder="Email"
          />
          <input
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            register();
          }}
          className="login-btn"
        >
          Register
        </button>
        <h3 className="go-to-reg" >
          Existing User?
          <span className="join-now" onClick={() => navigate("/login")}>
            Login
          </span>
        </h3>
      </div>
       
      </div>
   
  );
}
