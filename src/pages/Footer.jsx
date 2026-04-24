import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import footerLogo from "../assets/images/footerlogo.png"; // عدلي المسار حسب عندك

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="footer-logo">
              <img src={footerLogo} alt="Healthcare Team" className="img-fluid" />
            </h5>
            <p className="footer-text">
              Your trusted partner for healthcare solutions and medical equipment.
            </p>
          </Col>

          <Col md={2}>
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li>Find Hospitals</li>
              <li>Rent Equipment</li>
              <li>AI Assistant</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="footer-title">Contact</h6>
            <p className="footer-text mb-1">Email: support@MedRent.com</p>
            <p className="footer-text mb-1">Phone: 1-800-HEALTH</p>
            <p className="footer-text">Address: 123 Medical St, City</p>
          </Col>
        </Row>

        <hr className="footer-line" />

        <p className="footer-copy text-center">
          © 2025 MedRent. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}