import { Container, Card, Button, Form } from "react-bootstrap";
import OtpImg from '../assets/images/otp.jpg'

const OTPForm = () => {
  return (
    <div className="otp-wrapper bg-light">
      <Card className="otp-card">
        {/* Image */}
        <div className="otp-image">
          <img src={OtpImg} alt="OTP" className="w-100" />
        </div>

        {/* Text */}
        <p className="otp-text">
          Enter the 6-digit OTP sent to your email
        </p>

        {/* OTP Inputs */}
        <Form className="otp-form">
          <div className="otp-inputs">
            {[...Array(6)].map((_, i) => (
              <Form.Control
                key={i}
                type="text"
                maxLength="1"
                className="otp-input"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="resend">
            <span>Didn’t get the OTP?</span><br/>
            <button type="button">Resend OTP</button>
          </div>

          {/* Button */}
          <Button type="submit" className="otp-btn">
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OTPForm;
