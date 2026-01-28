import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/images/signUp.png";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // generate otp
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = /^\d{10,15}$/.test(phone);
    const isPasswordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password);

    if (!fullName.trim()) return setError("Please enter your full name");
    if (!isEmailValid) return setError("Please enter a valid email");
    if (!isPhoneValid) return setError("Please enter a valid phone number");
    if (!isPasswordValid)
      return setError(
        "Password must be at least 6 chars and include letters, numbers & symbols"
      );

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          phone,
        }),
      });

      
      if (res.ok) {
        const otp = generateOTP();
        localStorage.setItem("signupEmail", email);
        localStorage.setItem("signupOTP", otp);

        navigate("/otp");
        return;
      }

      
      if (res.status === 400) {
        const text = await res.text();

        if (text.toLowerCase().includes("email exists")) {
          setError("Email already exists");
        } else {
          setError(text || "Server error, please try again");
        }
        return;
      }

     
      setError("Server error, please try again");
    } catch (err) {
      console.error(err);
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper bg-light">
      <div className="signup-card">
        <div className="image-box">
          <img src={signupImg} alt="illustration" className="signup-img" />
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="custom-input-box">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="custom-input-box">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="custom-input-box">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="custom-input-box">
            <label className="input-label">Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control custom-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  userSelect: "none",
                  color: "#555",
                  fontSize: "16px",
                }}
              >
                {showPassword ? <i class="fa-solid fa-eye"></i>  : <i class="fa-solid fa-eye-slash"></i>}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn continue-btn w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;


