import React, { useState } from "react";
import {RegisterAPI,GoogleSignInAPI  } from "../api/AuthAPI";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import img from "../assets/online-02.jpg";
import Navbar from "../components/common/Navbar/Navbar"
export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
    const register = async() => {
        try {
        let res = await RegisterAPI(credentails.email, credentails.password);
        toast.success("Account created");
        localStorage.setItem('userEmail',res.user.email);
        postUserData({ name: credentails.name,email: credentails.email})
        navigate('/dashboard')
        } catch (err){
            console.log(err);
            toast.error("Cannot create your Account");
        }
    };
    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
    }
    return (
        <div className="login-wrapper">
    <img className="login-image" src={img} alt="iphone-mockup" />
<div className="navbar-title">
<Navbar />
</div>

      <div className="login-wrapper-inner">
        <h1 className="heading">Register</h1>
        <p className="sub-heading">Start Exploring!</p>

        <div className="auth-inputs">
          
        <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Name"
          />
          
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={register} className="login-btn">
          Register
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
    
      <div className="google-btn-container">
      <GoogleButton className="google-btn"
      onClick={googleSignIn}
      />
      <p className="go-to-signup">
          Existing User?
          <span className="join-now" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
      </div>
         
    );
}