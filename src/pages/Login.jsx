import React, { useState } from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\d{10,15}$/.test(value); 

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or phone number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      
      await new Promise((r) => setTimeout(r, 1000));
     
      window.location.reload();
    } catch (err) {
      setError(err.message || "Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4 login-card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-3">
          <img src={login} alt="login illustration" className="img-fluid login-img" />
        </div>

        <h5 className="text-center fw-bold mb-3">Hello! Let's get started</h5>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Please enter your email or phone number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn custom-login-btn w-100" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p className="text-center mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none signup-text">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}



