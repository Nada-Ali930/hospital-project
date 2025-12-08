import React from "react";

function SignUp() {
  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="image-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"  
            alt="illustration"
            className="signup-img"
          />
        </div>

        <form className="mt-4">

          <div className="custom-input-box">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="custom-input-box">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="custom-input-box">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter your phone number"
            />
          </div>

          <button className="btn continue-btn w-100 mt-2">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;




