import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import img from "../assets/online-02.jpg";
import Navbar from "../components/common/Navbar/Navbar";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidEmailDomain = (email) => {
    const allowedDomains = ["ug.cusat.ac.in", "pg.cusat.ac.in", "cusat.ac.in"];
    const emailParts = email.split("@");
    const emailDomain = emailParts[1];

    if (allowedDomains.includes(emailDomain)) {
      const username = emailParts[0];
      if (/\d/.test(username)) {
        return false;
      }
      return true;
    }

    return false;
  };

  const containsNumber = (str) => {
    return /\d/.test(str);
  };

  const register = async () => {
    if (!isEmailValid(credentials.email)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }

    if (!credentials.name || !credentials.name.trim()) {
      toast.error("Invalid name. Please enter your name.");
      return;
    }

    if (containsNumber(credentials.name)) {
      toast.error("Invalid name. Name cannot contain numbers.");
      return;
    }

    if (!isValidEmailDomain(credentials.email)) {
      toast.error(
        "Invalid email domain. Please use 'ug.cusat.ac.in', 'pg.cusat.ac.in', or 'cusat.ac.in'"
      );
      return;
    }

    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account created");
      localStorage.setItem("userEmail", res.user.email);
      postUserData({ name: credentials.name, email: credentials.email, courses: [], imageLink: "" });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Cannot create your Account");
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${img})` }}>
      <img className="reg-image" src={img} alt="iphone-mockup" />
      <div className="navbar-title">
        <Navbar />
      </div>

      <div className="login-wrapper-inner">
        <h1 className="headingr"></h1>
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
        <p className="go-to-reg">
          Existing User?
          <span className="join-now" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
