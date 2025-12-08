import React from "react";
import { Link, NavLink } from "react-router-dom";
import '../index.css'
import logo from '../assets/images/logo.png'
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
      <div className="container">
        {/* Logo */}
        <Link to={'/'} className="navbar-brand fw-bold text-primary" >
          <img
            src={logo}
            alt="logo"
            style={{ height: "50px" }}
          />
          
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/about'}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/rentals'}>My Rentals</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/contact'}>Contact Us</NavLink>
            </li>
          </ul>

          {/* Right Buttons */}
          <div className="d-flex ms-3 gap-4 nav-btns">
            <Link className="btn  px-3 py-2 fw-medium sign-btn " to={'/signUp'}>Sign Up</Link>
            <Link className="btn  px-3 py-2 fw-medium login-btn" to={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
