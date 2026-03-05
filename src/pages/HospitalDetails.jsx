import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar, FaRegStar } from "react-icons/fa";
import arrow from "../assets/images/arrow.png";
import phone from "../assets/images/phone.png";
import location from "../assets/images/location.png";
import {
  HeartPulse,
  Brain,
  Baby,
  Microscope,
  Bone,
  Eye,
  Stethoscope,
  Activity,
} from "lucide-react";


const BASE_URL = "http://graduationprojectapi.somee.com";

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (img) => {
    if (!img) return "";
    return `${BASE_URL}${img.replace(/\\/g, "/")}`;
  };


  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="star-filled" />
      ) : (
        <FaRegStar key={i} className="star-empty" />
      )
    );
  };

  // 🏥 department icons
  // const departmentIcons = {
  //   Cardiology: <FaHeartbeat />,
  //   Neurology: <FaBrain />,
  //   Pediatrics: <FaChild />,
  //   Oncology: <FaUserMd />,
  //   Orthopedics: <FaBone />,
  //   Ophthalmology: <FaEye />,
  //   "General Medicine": <FaStethoscope />,
  //   Surgery: <FaUserMd />,
  //   Emergency: <FaStethoscope />,
  // };
  const departmentIcons = {
  Cardiology: <HeartPulse />,
  Neurology: <Brain />,
  Pediatrics: <Baby />,
  Oncology: <Microscope />,
  Orthopedics: <Bone />,
  Ophthalmology: <Eye />,
  "General Medicine": <Stethoscope />,
  Surgery: <Activity />,
  Emergency: <Activity />,
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalRes = await fetch(`${BASE_URL}/api/Hospital/${id}`);
        const hospitalData = await hospitalRes.json();

        const reviewRes = await fetch(
          `${BASE_URL}/api/Hospital/${id}/reviews`
        );
        const reviewData = await reviewRes.json();

        setHospital(hospitalData);
        setReviews(reviewData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4 mb-5">
      {/* Back */}
      <div className="back-btn mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </div>

      {/* HEADER */}
      <Row className="g-4 mb-4">
        {/* Hospital Card */}
        <Col md={8}>
          <Card className="hospital-main-card border-0 overflow-hidden">

            {/* IMAGE */}
            <div className="hospital-img-wrapper">
              <Card.Img
                src={getImageUrl(hospital.imageUrl)}
                className="hospital-img"
              />
            </div>

            <Card.Body>
              <h5 className="fw-semibold mb-1 h-name">{hospital.name}</h5>

              <div className="add-stars">
              <div className="stars">
                {renderStars(hospital.average)}
                <small className="text-muted ms-2">
                  ({hospital.count} reviews)
                </small>
              </div>
              <p className=" mb-1 h-add">
                <img src={location} alt="location"/> {hospital.address}
              </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Map Card */}
        <Col md={4}>
          <Card className="map-card-custom border-0 h-100">

            {/*  MAP */}
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${hospital.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="map-frame"
              loading="lazy"
            ></iframe>

            <div className="mt-5">
              <p className="mb-4 me-4">
                <img src={phone} alt="phone" className="me-2"/>(123) 456-7890
              </p>

              <a
                href={`https://maps.google.com/?q=${hospital.address}`}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none "
              >
                <img src={arrow} alt="arrow" className="me-2"/>
                Get Directions
              </a>
            </div>
          </Card>
        </Col>
      </Row>

      {/* TABS */}
      <Tabs defaultActiveKey="about" className="custom-tabs mb-3">
        <Tab eventKey="about" title="About">
          <p className="h-description mt-3">{hospital.description}</p>
        </Tab>

        {/* Departments */}
        <Tab eventKey="department" title="Department">
          <Row className="mt-3 g-3">
            {hospital.departments.map((dep, i) => (
              <Col xs={6} md={4} lg={2} key={i}>
                <Card className="department-card border-0 text-center">
                  <div className="department-icon">
  {React.cloneElement(
    departmentIcons[dep] || <Stethoscope />,
    { size: 22, color: "#007bff", strokeWidth: 2 }
  )}
</div>

                  <p className="department-name">{dep}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Reviews */}
        <Tab eventKey="reviews" title="Reviews">
          <div className="mt-3">
            {reviews.map((rev) => (
              <Card key={rev.hospitalReviewId} className="review-card mb-3">
                <div className="d-flex justify-content-between">
                  <strong>{rev.userName}</strong>
                  <div className="stars">{renderStars(rev.rating)}</div>
                </div>

                <p className="text-muted mt-2 mb-0">{rev.comment}</p>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>

      <Button
  className="w-100 book-btn mt-3"
  onClick={() => navigate(`/hospital/${id}/booking`)}
>
  Book Now
</Button>

    </Container>
  );
};

export default HospitalDetails;

