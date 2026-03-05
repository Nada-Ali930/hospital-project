import React, { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerificationCode() {

  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (e, index) => {

    const value = e.target.value;

    if (value.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }

  };

  const handleVerify = async () => {

    const code =
      inputs.current[0].value +
      inputs.current[1].value +
      inputs.current[2].value +
      inputs.current[3].value;

    setLoading(true);

    try {

      await axios.post(
        `http://GraduationProject.somee.com/api/Auth/verify-code?email=${email}&code=${code}`
      );

      navigate("/forget-password/veification-code/reset-password", {
        state: { email }
      });

    } catch (error) {

      alert("Invalid Code");

    }

    setLoading(false);
  };

  return (
    <div className="verification-page">

      <div className="verification-card">

        <h2 className="verification-title">
          Verification Code
        </h2>

        <p className="verification-subtitle">
          Type the verification code we have sent you
        </p>

        <div className="code-inputs">

          {[0,1,2,3].map((item,index)=>(
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-input"
              ref={(el)=>inputs.current[index]=el}
              onChange={(e)=>handleChange(e,index)}
            />
          ))}

        </div>


        <button
          className="verify-btn"
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

      </div>

    </div>
  );
}