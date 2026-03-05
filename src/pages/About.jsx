import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaCheck,
  FaHeartbeat,
  FaHospital,
  FaRobot,
  FaMapMarkerAlt,
  FaCube,
} from "react-icons/fa";
import aboutImg from "../assets/images/about.png";
import footerLogo from "../assets/images/footerlogo.png";


export default function About() {
  return (
    <div className="about-page mt-5 pt-4">

      {/* ===== Top Section ===== */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={5}>
              <img src={aboutImg} alt="Healthcare Team" className="img-fluid rounded-4 shadow" />
            </Col>
            <Col md={7}>
              <h4 className="A-M-title">Med<span>Rent</span> — Your Smart Companion in Healthcare</h4>
              <p className="text-muted text-center P-about">
                We bring the hospital and devices you need to you quickly, securely, and clearly,facilitate access to healthcare through smart recommendations, reliable device rental, and a simple user experience focused on the patient first.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== Mission / Vision / Values ===== */}
      <section className="py-4">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <Card className="info-card">
                <Card.Body>
                  <h6 className="">Our Mission</h6>
                  <p class="text-secondary">
                    Facilitate access to healthcare through smart recommendations, reliable device rental, and a simple user experience.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="info-card active">
                <Card.Body>
                  <h6 className="text-white">Our Vision</h6>
                  <p className="text-white">
                    To become the first smart assistant for every patient — reliable information, faster decisions, easier access to care.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="info-card">
                <Card.Body>
                  <h6 className="">Our Values</h6>
                  <p class="text-secondary">
                    Patient first, trust, simplicity, and innovation—guiding everything we do to make healthcare more accessible and reliable
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== What We Offer ===== */}
      <section className="py-5 offer container ">
        <Container>
          <h4 className="text-center fw-bold mb-3 offer-title">What We Offer</h4>
          <p className="text-center mb-5 text-secondary">A suite of intelligent tools designed to simplify your healthcare journey.</p>
          <Row className="g-4">
            <Col md={6}>
  <Card className="offer-card-new">
    <Card.Body className="d-flex align-items-start gap-3">
      
      <div className="offer-icon">
        <FaHospital />
      </div>

      <div>
        <h6 className="offer-title-new">
          Smart Hospital Recommendations
        </h6>
        <p className="offer-text w-50">
          Find the best hospital based on your symptoms, required services,
          location, ratings, and real-time department availability.
        </p>
      </div>

    </Card.Body>
  </Card>
</Col>


            <Col md={6}>
  <Card className="offer-card-new">
    <Card.Body className="d-flex align-items-start gap-3">
      <div className="offer-icon">
        <FaRobot />
      </div>

      <div>
        <h6 className="offer-title-new">
          AI Symptom Assistant
        </h6>
        <p className="offer-text w-50">
          Enter your symptoms and receive an instant, AI-driven recommendation
          for the most appropriate medical department.
        </p>
      </div>
    </Card.Body>
  </Card>
</Col>


            <Col md={6}>
  <Card className="offer-card-new">
    <Card.Body className="d-flex align-items-start gap-3">
      <div className="offer-icon">
        <FaMapMarkerAlt />
      </div>

      <div>
        <h6 className="offer-title-new">
          Location & Mapping System
        </h6>
        <p className="offer-text w-50">
          Access maps of nearby hospitals, get travel directions, and view
          estimated waiting times to plan your visit efficiently.
        </p>
      </div>
    </Card.Body>
  </Card>
</Col>


            <Col md={6}>
  <Card className="offer-card-new">
    <Card.Body className="d-flex align-items-start gap-3">
      <div className="offer-icon">
        <FaCube />
      </div>

      <div>
        <h6 className="offer-title-new">
          Medical Equipment Rental
        </h6>
        <p className="offer-text w-50">
          Rent oxygen concentrators, hospital beds, wheelchairs, and more.
          Compare pricing, reviews, and availability with ease.
        </p>
      </div>
    </Card.Body>
  </Card>
</Col>

          </Row>
        </Container>
      </section>

<section className="impact-section py-5">
  <Container>
    <Row className="g-4">
      <Col md={6}>
        <div className="impact-box">
          <h3>Social Impact</h3>
          <ul>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Improving access to specialized medical departments for all patients.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Reducing hospital overcrowding through intelligent patient routing.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Supporting patients who need temporary equipment without purchase burden.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Assisting elderly and disabled users with our accessible chatbot.
            </li>
          </ul>
        </div>
      </Col>

      <Col md={6}>
        <div className="impact-box">
          <h3>Economic Impact</h3>
          <ul>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Lowering healthcare costs for patients and providers through equipment rental.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Optimizing distribution of hospital resources to improve operational efficiency.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Encouraging a healthcare sharing-economy for better asset utilization.
            </li>
            <li>
              <span className="check-icon">
    <FaCheck />
  </span>
              Optimizing distribution of hospital resources to improve operational efficiency.
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  </Container>
</section>

{/* ===== Our Core Values ===== */}
<section className="core-values py-5">
  <Container>
    <h4 className="text-center fw-bold mb-2">Our Core Values</h4>
    <p className="text-center text-secondary mb-5">
      The principles that guide our work and define our commitment to the healthcare community.
    </p>

    <Row className="g-4 justify-content-between text-center">
      <Col md xs={6}>
        <Card className="value-card">
          <Card.Body>
            <FaCheck className="value-icon" />
            <h6>Accuracy</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col md xs={6}>
        <Card className="value-card">
          <Card.Body>
            <FaHospital className="value-icon" />
            <h6>Accessibility</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col md xs={6}>
        <Card className="value-card">
          <Card.Body>
            <FaHeartbeat className="value-icon" />
            <h6>Security</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col md xs={6}>
        <Card className="value-card">
          <Card.Body>
            <FaRobot className="value-icon" />
            <h6>Transparency</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col md xs={6}>
        <Card className="value-card">
          <Card.Body>
            <FaCube className="value-icon" />
            <h6>Innovation</h6>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

{/* ===== Technology We Use ===== */}
<section className="technology-section py-5">
  <Container>
    <h4 className="text-center fw-bold mb-2">Technology We Use</h4>
    <p className="text-center text-secondary mb-5">
      Our platform is built on a foundation of modern, secure, and scalable technologies.
    </p>

    <Row className="g-3 justify-content-center">
      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>ASP.NET Core Web API</Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>SQL Server</Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>AI & NLP</Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>Recommendation Systems</Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>Geolocation Services</Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="tech-card text-center">
          <Card.Body>Secure Web Interface</Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>


      <footer className="footer mt-5">
      <Container>
        <Row className="gy-4">

          {/* Logo & Description */}
          <Col md={4}>
            <h5 className="footer-logo">
              <img src={footerLogo} alt="Healthcare Team" className="img-fluid " />
            </h5>
            <p className="footer-text">
              Your trusted partner for healthcare solutions and medical
              equipment.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li>Find Hospitals</li>
              <li>Rent Equipment</li>
              <li>AI Assistant</li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={3}>
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>

          {/* Contact */}
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

    </div>
  );
}
