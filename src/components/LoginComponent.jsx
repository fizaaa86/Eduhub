import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI, ForgetPassword } from "../api/AuthAPI";
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
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

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

  const handleResetPassword = () => {
    ForgetPassword(forgotPasswordEmail)
      .then(() => {
        toast.success("Password reset email sent.");
        setIsForgotPassword(false);
        setForgotPasswordEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Failed to send password reset email. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <img className="login-image" src={img} alt="iphone-mockup" />
        <Navbar className="navbar" />
        <div className="login-wrapper-inner">
          <div className="login-right">
            <h1 className="headings"></h1>
            <p className="sub-heading">{isForgotPassword ? "Reset Password" : "Keep Exploring!"}</p>

            {!isForgotPassword ? (
              <div className="auth-inputs">
                <input
                  onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                  type="email"
                  className="common-input"
                  placeholder="Email or Phone"
                />
                <input
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                  type="password"
                  className="common-input"
                  placeholder="Password"
                />
              </div>
            ) : (
              <div className="auth-inputs">
                <input
                  onChange={(event) => setForgotPasswordEmail(event.target.value)}
                  type="email"
                  className="common-input"
                  placeholder="Email"
                />
              </div>
            )}

            {!isForgotPassword ? (
              <button onClick={login} className="login-btn">
                Login
              </button>
            ) : (
              <button onClick={handleResetPassword} className="login-btn">
                Reset Password
              </button>
            )}

            {!isForgotPassword ? (
              <p className="go-to-signup">
                New User?
                <span className="join-now" onClick={() => navigate("/register")}>
                  Register
                </span>
              </p>
            ) : (
              <p className="go-to-remember">
                Remember your password?
                <span className="join-now" onClick={() => setIsForgotPassword(false)}>
                  Login
                </span>
              </p>
            )}

            {!isForgotPassword && (
              <p className="forgot-password-link" onClick={() => setIsForgotPassword(true)}>
                Forgot Password?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
