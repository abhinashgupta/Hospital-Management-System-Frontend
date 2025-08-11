import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          HMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userRole === "PATIENT" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  My Dashboard
                </Link>
              </li>
            )}
            {(userRole === "ADMIN" || userRole === "DOCTOR") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor-dashboard">
                    My Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patients">
                    Patients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    Doctors
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <button className="btn btn-outline-light" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-light me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-success">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
