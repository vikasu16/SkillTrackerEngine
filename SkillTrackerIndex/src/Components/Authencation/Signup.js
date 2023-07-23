import React from "react";
import "./Authencation.css";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./Service";

export default function Signup() {
  const formData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [formDataInput, setFormDataInput] = React.useState(formData);
  const [errorStatusForMail, seterrorStatusForMail] = React.useState(false);
  const [errorStatusForOriginalPassword, seterrorStatusForOriginalPassword] =
    React.useState(false);
  const [errorStatusForPassword, seterrorStatusForPassword] =
    React.useState(false);
  const [confirmpassword, setreconfirmpassword] = React.useState("");
  const randomNumber = Math.floor(Math.random() * 10000);

  const navigate = useNavigate();
  const routeToLogin = () => {
    navigate("/");
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      password
    );
  }

  const handleChange = (e) => {
    if (e.target.name === "email") {
      if (!isValidEmail(e.target.value)) {
        seterrorStatusForMail(true);
      } else {
        seterrorStatusForMail(false);
      }
    }

    if (e.target.name === "password") {
      if (!isValidPassword(e.target.value)) {
        seterrorStatusForOriginalPassword(true);
      } else {
        seterrorStatusForOriginalPassword(false);
      }
    }

    if (e.target.name === "confirmpassword") {
      if (formDataInput.confirmpassword === formDataInput.password) {
        seterrorStatusForPassword(false);
      } else {
        seterrorStatusForPassword(true);
      }
    }

    setFormDataInput({ ...formDataInput, [e.target.name]: e.target.value });
  };

  function registerUser(e) {
    e.preventDefault();
    if (errorStatusForMail) {
      alert("Email is not valid.");
      return;
    }
    if (errorStatusForOriginalPassword) {
      alert(
        "Password should be 6-16 digit long, must one contain number, special character, lower case and upper case."
      );
      return;
    }
    RegisterUser(formDataInput)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Able to make request to the sever.");
        }
      })
      .then((response) => {
        if (response) {
          if (response["user_exists"]) {
            alert("User with same email address already exists.");
          } else if (!response["success_information"]) {
            alert("Internal Server Error Occured.");
          } else if (
            !response["user_exists"] &&
            response["success_information"]
          ) {
            alert("Successful registered please login to continue.");
            navigate("/");
          }
        }
      })
      .catch((error) => alert(error));
  }
  return (
    <div>
      <div className="authentication-form">
        <div className="form-container">
          <p className="title">Create Account</p>
          <form className="form" onSubmit={registerUser}>
            <div className="input-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder=""
                required
                value={formDataInput.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder=""
                required
                value={formDataInput.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder=""
                required
                value={formDataInput.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                required
                value={formDataInput.password}
                onChange={handleChange}
              />
            </div>
            <button className="sign">Sign Up</button>
          </form>
          <div className="social-message">
            <div className="line"></div>
            <p className="message">OR</p>
            <div className="line"></div>
          </div>

          <p className="signup">
            Already have an account?
            <a
              rel="noopener noreferrer"
              href="#"
              className=""
              onClick={routeToLogin}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
