import React, { useEffect } from "react";
import "./Authencation.css";
import { useNavigate } from "react-router-dom";
import { CreateLoginRequest } from "./Service";
import { Encryption } from "../Security";

export default function Login() {
  const formData = { email: "", password: "" };
  const [formDataInput, setFormDataInput] = React.useState(formData);
  const [errorStatus, setErrorStatus] = React.useState(false);
  const borderStyles = {
    border: "1px solid blue",
  };
  const [emailFormBorderStyle, setemailFormBorderStyle] =
    React.useState(borderStyles);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (e) => {
    if (e.target.name === "email") {
      if (!isValidEmail(e.target.value)) {
        setemailFormBorderStyle({
          border: "1px solid red",
        });
        setErrorStatus(true);
      } else {
        setemailFormBorderStyle({
          border: "1px solid blue",
        });
        setErrorStatus(false);
      }
    }

    setFormDataInput({ ...formDataInput, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  function routeToSignUp() {
    navigate("/signup");
  }

  function login(e) {
    e.preventDefault();
    if (!errorStatus) {
      CreateLoginRequest(formDataInput)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Email or Password is not valid.");
          }
        })
        .then((response) => {
          if (response) {
            Encryption("access_token", response["access_token"]);
            Encryption("expiration_time", response["expiration_time"]);

            navigate("/dashboard");
          }
        })
        .catch((error) => alert("Email or Password is not valid." + error));
    } else {
      alert("Please fill the correct email address.");
    }
  }

  return (
    <div>
      <div className="authentication-form">
        <div className="form-container">
          <p className="title">Login</p>
          <form className="form" onSubmit={login}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder=""
                value={formDataInput.email}
                style={emailFormBorderStyle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                value={formDataInput.password}
                style={borderStyles}
                onChange={handleChange}
                required
              />
              <div className="forgot">
                <a rel="noopener noreferrer" href="#">
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button className="sign">Sign in</button>
          </form>
          <div className="social-message">
            <div className="line"></div>
            <p className="message">OR</p>
            <div className="line"></div>
          </div>

          <p className="signup">
            Don't have an account?
            <a
              rel="noopener noreferrer"
              href="#"
              className=""
              onClick={routeToSignUp}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
