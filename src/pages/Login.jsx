import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "../assets/images/login.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🟢 لو جاي من Signup حط الإيميل تلقائي
  useEffect(() => {
    const signupEmail = localStorage.getItem("signupEmail");
    if (signupEmail) {
      setEmail(signupEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://www.graduationproject.somee.com/api/Auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ حفظ بيانات اليوزر
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("role", response.data.role);

      // 🧹 تنظيف بيانات signup
      localStorage.removeItem("signupEmail");
      localStorage.removeItem("signupOTP");

      // 🚀 دخول الموقع
      navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-sm p-4 login-card"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <img
            src={loginImg}
            alt="login"
            className="img-fluid login-img"
          />
        </div>

        <h5 className="text-center fw-bold mb-3">
          Hello! Let's get started
        </h5>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn custom-login-btn w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-text">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
