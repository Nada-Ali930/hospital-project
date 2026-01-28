import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import mainImgBlack from "../assets/images/wheelchair.jpg";
import mainImgBlue from "../assets/images/bed.jpg";
import mainImgOrange from "../assets/images/crutches.jpg";

import user1 from "../assets/images/doctor1.jpg";
import user2 from "../assets/images/doctor2.jpg";

const images = [
  { id: 1, src: mainImgBlack },
  { id: 2, src: mainImgBlue },
  { id: 3, src: mainImgOrange },
];

const reviews = [
  {
    id: 1,
    name: "Ahmed L.",
    image: user1,
    stars: 4,
    text: "Comfortable and easy-to-control electric wheelchair with great performance, though the battery life could be slightly better",
  },
  {
    id: 2,
    name: "Ali A.",
    image: user2,
    stars: 3,
    text: "Good electric wheelchair with decent comfort and control, but the battery and build quality could be improved",
  },
];

function RentalDetails() {
  const [mainImage, setMainImage] = useState(images[0].src);
  const [activeTab, setActiveTab] = useState("spec");
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const occupiedDays = [18, 19, 20, 21, 22, 23];

  const handleDateClick = (day) => {
    if (!occupiedDays.includes(day)) setSelectedDate(day);
  };

  return (
    <div className="rental-details container py-4">
      {/* Top Section */}
      <div className="row gy-4">
        {/* Gallery */}
        <div className="col-lg-5">
          <img src={mainImage} alt="wheelchair" className="main-image mb-3" />
          <div className="d-flex gap-2">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt=""
                className={`thumb ${mainImage === img.src ? "active-thumb" : ""}`}
                onClick={() => setMainImage(img.src)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="col-lg-7">
          <h2 className="product-title mb-2">Electric wheelchair</h2>
          <div className="rating mb-3">
            ★★★★☆ <span className="text-muted">(120 Reviews)</span>
          </div>

          {/* Pricing */}
          <h5 className="section-title">Rental Pricing</h5>
          <div className="d-flex gap-3 mb-3 flex-wrap">
            <div className="price-box light">
              <p className="mb-1">Per Day</p>
              <h4>100.00 LE</h4>
            </div>
            <div className="price-box dark position-relative">
              <span className="save">Save 15%</span>
              <p className="mb-1">Per Week</p>
              <h4>700.00 LE</h4>
            </div>
          </div>

          {/* Tabs */}
          <div className="d-flex gap-3 mb-3 tab-buttons">
            <button
              className={`tab-btn ${activeTab === "spec" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("spec")}
            >
              Specification
            </button>
            <button
              className={`tab-btn ${activeTab === "usage" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("usage")}
            >
              Usage Notes
            </button>
          </div>

          {activeTab === "spec" && (
            <ul className="specs mb-3">
              <li>Motor Power: 250–300W dual-motor</li>
              <li>Battery Range: 15–25 km per full charge</li>
              <li>Max Speed: 6 km/h</li>
              <li>Climbing Ability: Up to 10–12° incline</li>
            </ul>
          )}
          {activeTab === "usage" && (
            <p className="usage-text mb-3">
              Always check battery before use. Avoid wet surfaces. Store in a dry
              place.
            </p>
          )}
          {/* Rent Now Button */}
          <Link to="/checkout" className="rent-btn d-inline-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} /> Rent Now
          </Link>
        </div>
      </div>

      {/* Availability Calendar */}
      <div className="availability mt-5">
        <h5>Check Availability</h5>
        <div className="calendar mt-3">
          {calendarDays.map((day) => {
            let statusClass = "available";
            if (occupiedDays.includes(day)) statusClass = "occupied";
            else if (selectedDate === day) statusClass = "selected";
            return (
              <div
                key={day}
                className={`calendar-day ${statusClass}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="calendar-legend mt-2 d-flex gap-3">
          <span><span className="dot available"></span> Available</span>
          <span><span className="dot occupied"></span> Occupied</span>
          <span><span className="dot selected"></span> Selected</span>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews mt-5">
        <h5>User Reviews</h5>

        {reviews.map((rev) => (
          <div key={rev.id} className="review-card d-flex gap-3 align-items-start mb-3 p-3 rounded">
            <img src={rev.image} alt={rev.name} className="user-img rounded-circle" />
            <div className="review-content flex-grow-1">
              <strong>{rev.name}</strong>
              <div className="stars mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < rev.stars ? "★" : "☆"}</span>
                ))}
              </div>
              <p>{rev.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RentalDetails;