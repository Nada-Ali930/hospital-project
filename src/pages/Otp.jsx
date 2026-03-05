import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import OtpImg from "../assets/images/otp.jpg";

const OTPForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      return setError("Please enter the full 6-digit OTP");
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://graduationprojectapi.somee.com/api/Auth/verify-register?email=${email}&code=${code}`,
        {
          method: "POST",
        }
      );

      const text = await res.text();

      if (res.ok) {
        alert("Account created successfully");
        navigate("/login");
        return;
      }

      setError(text || "Invalid OTP");
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-wrapper bg-light">
      <Card className="otp-card">
        <div className="otp-image">
          <img src={OtpImg} alt="OTP" className="w-100" />
        </div>

        <p className="otp-text">
          Enter the 6-digit OTP sent to your email
        </p>

        {error && <p className="text-danger text-center">{error}</p>}

        <Form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, i) => (
              <Form.Control
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="otp-input"
              />
            ))}
          </div>

          <Button type="submit" className="otp-btn" disabled={loading}>
            {loading ? "Verifying..." : "Sign Up"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OTPForm;