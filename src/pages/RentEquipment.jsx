import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

import bed from "../assets/images/bed.jpg";
import nebulizer from "../assets/images/nebulizer.jpg";
import lift from "../assets/images/lift.jpg";
import walker from "../assets/images/walker.jpg";
import crutches from "../assets/images/crutches.jpg";
import wheelchair from "../assets/images/wheelchair.jpg";

export default function RentEquipment() {
  // ---------- PRODUCTS ----------
  const products = [
    { name: "Medical bed", price: 25, category: "Hospital Beds", img: bed, reviews: 120, available: true },
    { name: "Omron Compressor Nebulizer", price: 10, category: "Oxygen", img: nebulizer, reviews: 200, available: true },
    { name: "Electric Patient Lift", price: 50, category: "Patient Lifts", img: lift, reviews: 95, available: false },
    { name: "Walking frame", price: 15, category: "Walkers & Canes", img: walker, reviews: 150, available: true },
    { name: "Underarm crutches", price: 10, category: "Walkers & Canes", img: crutches, reviews: 255, available: true },
    { name: "Electric wheelchair", price: 30, category: "Wheelchairs", img: wheelchair, reviews: 120, available: false },
  ];

  // ---------- SEARCH ----------
  const [searchTerm, setSearchTerm] = useState("");

  // ---------- FILTER STATES ----------
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // ---------- PAGINATION ----------
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- RESET PAGE WHEN SEARCH OR FILTER CHANGE ----------
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filtersApplied]);

  // ---------- FILTER LOGIC ----------
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!filtersApplied) {
      return matchSearch;
    }

    const matchCategory = category ? p.category === category : true;
    const matchPrice = p.price <= maxPrice;
    const matchAvailability = onlyAvailable ? p.available : true;

    return matchSearch && matchCategory && matchPrice && matchAvailability;
  });

  // ---------- PAGINATION LOGIC ----------
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container fluid className="p-4">
      <h3 className="text-center my-4 main-title">
        <span>Find</span> & <span>Rent</span> Medical Equipment
      </h3>

      {/* SEARCH BAR */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <div className="input-group">
            <span className="input-group-text border-end-0 search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>

            <Form.Control
              type="text"
              className="search-bar border-start-0"
              placeholder="Search for equipment like 'wheelchair', 'hospital bed'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
      </Row>

      <Row>
        {/* FILTERS */}
        <Col md={3}>
          <Card className="p-3 shadow-sm rounded-2 filter">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Filters</h5>

              <button
                className="btn btn-link p-0 clear-btn text-decoration-none"
                onClick={() => {
                  setCategory("");
                  setMaxPrice(500);
                  setOnlyAvailable(false);
                  setFiltersApplied(false);
                  setCurrentPage(1);
                }}
              >
                Clear all
              </button>
            </div>

            <h6 className="category">Category</h6>
            {["Oxygen", "Wheelchairs", "Hospital Beds", "Walkers & Canes", "Patient Lifts"].map((cat) => (
              <Form.Check
                className="text-muted category-items"
                type="radio"
                label={cat}
                name="category"
                key={cat}
                onChange={() => setCategory(cat)}
              />
            ))}

            <hr />

            <h6 className="rang-title">Daily Rental Rate</h6>
            <Form.Range
              className="form-rang"
              min={10}
              max={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <div className="d-flex align-items-center gap-5">
              <small className="rang-price r-price">$10</small>
              <small className="rang-price">${maxPrice}+</small>
            </div>

            <hr />

            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0 availability">Availability</h6>

              <Form.Check
                type="switch"
                className="big-switch"
                checked={onlyAvailable}
                onChange={() => setOnlyAvailable(!onlyAvailable)}
              />
            </div>

            {/* APPLY FILTERS */}
            <Button
              className="mt-3 w-100 filter-button"
              variant="primary"
              onClick={() => {
                setFiltersApplied(true);
                setCurrentPage(1);
              }}
            >
              Apply Filters
            </Button>
          </Card>
        </Col>

        {/* PRODUCTS LIST */}
        <Col md={9}>
          <Row>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((item, index) => (
                <Col md={4} className="mb-4" key={index}>
                  <Card className="product-card shadow-sm">
                    {/* image */}
                    <div className="card-img-wrap">
                      <Card.Img variant="top" src={item.img} className="product-img" />
                    </div>

                    {/*  (nifty bottom box) */}
                    <div className="bottom-blue-box">
                      {/* title*/}
                      <h5 className="product-title">{item.name}</h5>

                      {/* stars + Reviews */}
                      <div className="ratings-row d-flex justify-content-between align-items-center">
                        <div className="stars">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-regular fa-star empty-star"></i>
                        </div>

                        <span className="text-muted">({item.reviews} Reviews)</span>
                      </div>

                      {/* price*/}
                      <div className="fw-bold price-text">From ${item.price}/day</div>

                      {/* button */}
                      <Button className="view-btn mt-2">View Details</Button>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <h5 className="text-center mt-5 text-muted">No results found.</h5>
            )}
          </Row>

          {/* PAGINATION */}
          {filteredProducts.length > 0 && (
            <div className="custom-pagination d-flex align-items-center justify-content-center mt-4">
              {/* Previous */}
              <button
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>

              {/* Numbers */}
              <div className="numbers d-flex align-items-center">
                {[1, 2, 3, "...", totalPages].map((num, idx) =>
                  num === "..." ? (
                    <span key={idx} className="dots">
                      …
                    </span>
                  ) : (
                    <button
                      key={idx}
                      className={`number ${currentPage === num ? "active" : ""}`}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>

              {/* Next */}
              <button
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
