import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import resetImg from "../assets/images/resetpassword.jpg";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      await axios.post(
        `http://GraduationProject.somee.com/api/Auth/reset-password?email=${email}&newPassword=${password}`
      );

      setShowSuccess(true);

    } catch (error) {

      alert("Something went wrong ❌");

    }

    setLoading(false);
  };

  return (

    <div className="reset-page">

      <div className="reset-card">

        <img
          src={resetImg}
          alt="reset"
          className="reset-image"
        />

        <h2 className="reset-title">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="password-group">

            <label>New Password</label>

            <div className="password-input">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <span
                onClick={()=>setShowPassword(!showPassword)}
              >
                👁
              </span>

            </div>

          </div>

          <div className="password-group">

            <label>Confirm password</label>

            <div className="password-input">

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="******"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />

              <span
                onClick={()=>setShowConfirm(!showConfirm)}
              >
                👁
              </span>

            </div>

          </div>

          <button className="confirm-btn">

            {loading ? "Saving..." : "Confirm"}

          </button>

        </form>

      </div>


      {/* SUCCESS POPUP */}

      {showSuccess && (

        <div className="success-overlay">

          <div className="success-popup">

            <div className="success-icon">
              ✔
            </div>

            <h3 className="success-text">
              The password has been changed.
            </h3>

            <button
              className="login-btn"
              onClick={()=>navigate("/login")}
            >
              Go to Login
            </button>

          </div>

        </div>

      )}

    </div>
  );
}
