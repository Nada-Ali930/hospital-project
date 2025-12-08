import React from "react";
import logo from '../assets/images/logo.png'
export default function Footer() {
  return (
    <footer className="footer-bg text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Logo + description */}
          <div className="col-md-4 mb-4">
            <img
              src={logo}
              alt="MedRent Logo"
              className="footer-logo mb-3"
            />
            <p className="text-white-50 footer-desc">
              Your trusted partner for healthcare solutions and medical equipment
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold footer-title">Quick Links</h5>
            <ul className="list-unstyled text-white-50 footer-list">
              <li>Find Hospitals</li>
              <li>Rent Equipment</li>
              <li>AI Assistant</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold footer-title">Support</h5>
            <ul className="list-unstyled text-white-50 footer-list">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold footer-title">Contact</h5>
            <ul className="list-unstyled text-white-50 footer-list">
              <li>Email: support@MedRent.com</li>
              <li>Phone: 1-800-HEALTH</li>
              <li>Address: 123 Medical St, City</li>
            </ul>
          </div>

        </div>

        <hr className="footer-line" />

        <div className="text-center mt-3">
          <p className="mb-0 text-white-50">© 2025 MedRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}