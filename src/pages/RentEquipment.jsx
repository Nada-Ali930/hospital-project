
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://www.graduationproject.somee.com";

const getImageUrl = (img) => {
  if (!img) return "";
  return `${BASE_URL}${img.replace(/\\/g, "/")}`;
};

const CATEGORIES = ["All", "Monitoring", "Respiratory", "Diagnostic", "Therapy", "Surgical"];

export default function RentEquipment() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [categoryForFilter, setCategoryForFilter] = useState("All"); 

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // ================= MAP DATA =================
  const mapData = (data) =>
    data.map((item) => ({
      id: item.equipmentId,
      name: item.name,
      price: item.pricePerDay,
      available: item.availability,
      img: getImageUrl(item.imageUrl),
      category: item.name.toLowerCase().includes("monitor")
        ? "Monitoring"
        : item.name.toLowerCase().includes("vent")
        ? "Respiratory"
        : item.name.toLowerCase().includes("x-ray")
        ? "Diagnostic"
        : item.name.toLowerCase().includes("pump")
        ? "Therapy"
        : "Surgical",
    }));

  // ================= GET ALL =================
  useEffect(() => {
    fetch(`${BASE_URL}/api/Equipment/search`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = mapData(data);
        setProducts(mapped);
        setFilteredProducts(mapped);
        setLoading(false);
      });
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`${BASE_URL}/api/Equipment/search?name=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          const mapped = mapData(data);
          setProducts(mapped);
          setFilteredProducts(mapped);
          setCurrentPage(1);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ================= FILTER =================
  const applyFilters = () => {
    const filtered = products.filter(
      (item) =>
        item.price <= maxPrice &&
        (!onlyAvailable || item.available) &&
        (categoryForFilter === "All" || item.category === categoryForFilter)
    );
    setFilteredProducts(filtered);
    setSelectedCategory(categoryForFilter); 
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setMaxPrice(5000);
    setOnlyAvailable(false);
    setCategoryForFilter("All");
    setSelectedCategory("All");
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // ================= UI =================
  return (
    <Container fluid className="p-4">
      <h3 className="text-center my-4 main-title">
        <span>Find</span> & <span>Rent</span> Medical Equipment
      </h3>

      {/* SEARCH */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <div className="input-group">
            <span className="input-group-text border-end-0 search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <Form.Control
              type="text"
              className="search-bar border-start-0"
              placeholder="Search for equipment like 'wheelchair'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
      </Row>

      <Row>
        {/* FILTER */}
        <Col md={3}>
          <Card className="p-3 filter">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="category mb-0">Filter</h5>
              <Button variant="link" onClick={clearFilters} className="clear-btn">
                Clear
              </Button>
            </div>

            {/* CATEGORY */}
            <h6 className="category mt-3">Category</h6>
            <div className="category-items">
              {CATEGORIES.map((cat) => (
                <Form.Check
                  key={cat}
                  type="radio"
                  name="category"
                  label={cat}
                  checked={categoryForFilter === cat}
                  onChange={() => setCategoryForFilter(cat)}
                />
              ))}
            </div>

            <hr />
            <h6 className="mt-3">Max Price / Day</h6>
            <Form.Range
              min={0}
              max={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <small>${maxPrice}</small>

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

            <Button className="filter-button w-100 mt-3" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Card>
        </Col>

        {/* PRODUCTS */}
        <Col md={9}>
          {loading && <h5 className="text-center">Loading...</h5>}

          <Row>
            {displayedProducts.map((item) => (
              <Col md={4} className="mb-4" key={item.id}>
                <Card className="product-card h-100 d-flex flex-column">
                  <div className="card-img-wrap">
                    <Card.Img src={item.img} alt={item.name} className="product-img" />
                  </div>

                  <div className="bottom-blue-box flex-grow-1 d-flex flex-column p-3">
                    {!item.available && <span className="badge bg-danger mb-2">Not Available</span>}

                    <h5 className="product-title">{item.name}</h5>

                    <div className="ratings-row d-flex justify-content-between align-items-center">
                      <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star empty-star"></i>
                      </div>
                      <span className="text-muted">(0 Reviews)</span>
                    </div>

                    <div className="price-text mt-2">From ${item.price} / day</div>

                    <Button
                      className="view-btn mt-auto"
                      onClick={() => navigate(`/rentals/${item.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="custom-pagination mt-4">
              <button
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>

              <div className="numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`number ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

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
