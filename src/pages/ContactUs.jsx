import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post("/api/ContactUs", formData);
      setSuccess("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        body: "",
      });
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Container className="contact-wrapper">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We're here to help. Send us a message or find our contact information below.
      </p>

      <div className="contact-box">
        <Row>
          
          <Col lg={7} md={12} className="contact-left">
            <h5 className="section-title">Send us a message</h5>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form>
              <Form.Control
                className="custom-input"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control
                className="custom-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control
                className="custom-input"
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Form.Control
                as="textarea"
                rows={15}
                className="custom-input textarea"
                name="body"
                placeholder="Message"
                value={formData.body}
                onChange={handleChange}
                required
              />
            </Form>
          </Col>

          
          <Col lg={5} md={12} className="contact-right">
            <div className="Contact_Info">
              <h6 className="section-title">Contact Information</h6>

              <div className="info-item">
                <span className="icon-box">
                  <FaMapMarkerAlt />
                </span>
                <span>
                  RXGW+8M3 سبرياي طنطا Tanta, Gharbia Governorate, Egypt
                </span>
              </div>

              <div className="info-item">
                <span className="icon-box">
                  <FaPhoneAlt />
                </span>
                <span>+201286878176</span>
              </div>

              <div className="info-item">
                <span className="icon-box">
                  <FaEnvelope />
                </span>
                <span>contact@medrent.com</span>
              </div>
            </div>
            <iframe
              title="Faculty of Computers and Information - Tanta University"
              src="https://www.google.com/maps?q=Faculty%20of%20Computers%20and%20Information%20Tanta%20University&output=embed"
              loading="lazy"
            ></iframe>
          </Col>
        </Row>

        {/* ===== Button كامل العرض ===== */}
        <button
          type="button"
          className="send-btn-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </Container>
  );
}

export default ContactUs;