import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand nav-main-title" href="#">
          Skill Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                DashBoard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Questions
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <LogoutIcon />
            <button className="btn btn-sm" onClick={logout}>
              log out
            </button>
          </span>
        </div>
      </nav>
    </div>
  );
}
