
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function HospitalSearch() {
  const [searchText, setSearchText] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      setHospitals([]);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/Hospital/search", {
        text: query,
      });

      if (response.data.success) {
        setHospitals(response.data.results || []);
      } else {
        setHospitals([]);
      }
    } catch (error) {
      console.error("Error fetching hospitals", error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospital-search-page">
      <Container className="hospital-page">
        <h2 className="page-title">Find Hospitals</h2>

        {/* Search Bar */}
        <Form onSubmit={handleSearch} className="search-form">
          <Form.Control
            type="text"
            placeholder="Search by location or hospital name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="submit" className="search-btn">
            Search
          </Button>
        </Form>

        {/* Loading */}
        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" />
            <p>Loading.....</p>
          </div>
        )}

        {/* No Results */}
        {!loading && hospitals.length === 0 && (
          <p className="text-center mt-4">No hospitals found.</p>
        )}

        {/* Cards */}
        <Row className="mt-4">
          {hospitals.map((hospital) => {
            const imagePath = hospital.imageUrl
              ? `http://www.graduationproject.somee.com${hospital.imageUrl.replace(
                  /\\/g,
                  "/"
                )}`
              : "https://images.unsplash.com/photo-1586773860418-d37222d8fce3";

            return (
              <Col md={4} sm={6} xs={12} key={hospital.id} className="mb-4">
                <Card className="hospital-card h-100">
                  <Card.Img variant="top" src={imagePath} />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{hospital.name}</Card.Title>

                    <Card.Text className="location">
                      {hospital.address}
                    </Card.Text>

                    {/* Departments */}
                    <div className="departments">
                      {hospital.departments?.map((dept, index) => (
                        <span key={index} className="dept-badge">
                          {dept}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < Math.round(hospital.average)
                              ? "star filled"
                              : "star"
                          }
                        />
                      ))}
                      <span className="rating-number">
                        {hospital.average} ({hospital.count})
                      </span>
                    </div>

                    <p className="price">
                      Reservation: ${hospital.reservationPrice}
                    </p>
                    <div className="card-buttons mt-auto">
                      <Link
                        to={`/book/${hospital.id}`}
                        className="btn btn-primary btn-book"
                      >
                        Book Now
                      </Link>

                      <Link
                        to={`/hospital-details/${hospital.id}`}
                        className="btn btn-outline-primary btn-details"
                      >
                        View Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

