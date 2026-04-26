// import React from "react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../index.css'
import logo from '../assets/images/logo.png'
import { useNavigate } from "react-router-dom";




export default function Navbar() {

  const [open, setOpen] = useState(false);

const navigate = useNavigate();

const role =
  localStorage.getItem("role") ||
  sessionStorage.getItem("role");

    const name =
  localStorage.getItem("name") ||
  sessionStorage.getItem("name");


const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  navigate("/login");
};

const handleProfileClick = () => {
  if (role === "Doctor") {
    navigate("/dashboard"); 
  } else if (role === "EquipmentOwner") {
    navigate("/equipmentowner-dashboard"); 
  } else {
    navigate("/profile"); // Patient
  }
};

console.log("ROLE:", role);

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
            {/* <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/rentals'}>My Rentals</NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to={'/contact'}>Contact Us</NavLink>
            </li>
          </ul>

          {/* Right Buttons */}
          {/* <div className="d-flex ms-3 gap-4 nav-btns">
            <Link className="btn  px-3 py-2 fw-medium sign-btn " to={'/signUp'}>Sign Up</Link>
            <Link className="btn  px-3 py-2 fw-medium login-btn" to={'/login'}>Login</Link>
          </div> */}
          <div className="d-flex ms-3 gap-4 nav-btns align-items-center">
  {!name ? (
    <>
      <Link className="btn px-3 py-2 fw-medium sign-btn" to={'/signUp'}>
        Sign Up
      </Link>
      <Link className="btn px-3 py-2 fw-medium login-btn" to={'/login'}>
        Login
      </Link>
    </>
  ) : (

<div
  className="user-menu"
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
  <div className="user-avatar">
    {name.charAt(0).toUpperCase()}
  </div>

  {open && (
    <div className="dropdown-menu-custom">
      <div
        className="dropdown-item"
        onClick={handleProfileClick}
      >
        Profile
      </div>

      <div
        className="dropdown-item logout"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  )}
</div>
    
    
  )}
</div>
        </div>
      </div>
    </nav>
  )
}
