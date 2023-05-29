import React, { useState } from "react";
import {LoginAPI,GoogleSignInAPI  } from "../api/AuthAPI";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";


export default function LoginComponent() {
    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
    const login = async() => {
        try {
        let res = await LoginAPI(credentails.email, credentails.password);
        toast.success("Logged in Successfully");
        navigate('/dashboard')
        } catch (err){
            console.log(err);
            toast.error("Invalid user");
        }
    };
    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
        navigate('/dashboard');
    }
    return (
        <div className="login-wrapper">
     

      <div className="login-wrapper-inner">
        <h1 className="heading">Login</h1>
        <p className="sub-heading">Keep Exploring!</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
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
        <button onClick={login} className="login-btn">
          Login
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
    
      <div className="google-btn-container">
      <GoogleButton className="google-btn"
      onClick={googleSignIn}
      />
      <p className="go-to-signup">
          New User?
          <span className="join-now" onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
      </div>
         
    );
}