import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import forgetpassImg from "../assets/images/forgetPass.jpg";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      await axios.post(
        "http://GraduationProject.somee.com/api/Auth/forgot-password",
        { email }
      );

      setMessage("Code sent successfully ✅");

      
      setTimeout(() => {
        navigate("/forget-password/veification-code", {
          state: { email }
        });
      }, 1000);

    } catch (error) {
      setMessage("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="forgotPassword">
      <div className="reset-container d-flex justify-content-center align-items-center">

        <div className="reset-card text-center">

          <img
            src={forgetpassImg}
            alt="reset"
            className="reset-img"
          />

          <h2 className="reset-title">Reset your password</h2>

          <p className="reset-subtitle">
            Enter your email address and we will send you a Verification Code
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-4 text-start input-group">
              <input
                type="email"
                className="form-control reset-input"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <button
              type="submit"
              className="btn reset-btn w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </form>

          {message && <p className="mt-3">{message}</p>}

        </div>

      </div>
    </div>
  );
}
