import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faChevronLeft,
  faChevronRight,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function RentalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [bookedDates, setBookedDates] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [enableSelect, setEnableSelect] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [eq, rev, rate, avail] = await Promise.all([
          axios.get(`/api/Equipment/${id}`),
          axios.get(`/api/Equipment/${id}/reviews`),
          axios.get(`/api/Equipment/${id}/rating-summary`),
          axios.get(`/api/Equipment/${id}/availability`),
        ]);

        setEquipment(eq.data);
        setReviews(rev.data || []);
        setRating(rate.data);
        setBookedDates(avail.data.bookedDates || []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!equipment) return <p>No Data</p>;

  /* ================= Calendar ================= */
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isBooked = (day) =>
    bookedDates.some((d) => {
      const date = new Date(d);
      return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });

  const handleSelectDay = (day) => {
    if (!enableSelect || isBooked(day)) return;

    const selected = new Date(year, month, day);

    if (!startDate || endDate) {
      setStartDate(selected);
      setEndDate(null);
    } else if (selected > startDate) {
      setEndDate(selected);
    }
  };

  const renderStars = (value) => {
    const rounded = Math.round(value);
    return (
      <>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesomeIcon
            key={i}
            icon={i <= rounded ? solidStar : regularStar}
            className="star"
          />
        ))}
      </>
    );
  };

  const ratingCount = (n) => reviews.filter((r) => r.rating === n).length;
  const percent = (n) =>
    rating.count ? Math.round((ratingCount(n) / rating.count) * 100) : 0;

  return (
    <div className="rental-details">
      <div className="details-card">
        <div className="image-box">
          <img
            src={`http://www.graduationproject.somee.com${equipment.imageUrl}`}
            alt={equipment.name}
          />
        </div>

        <div className="info-box">
          <h2>{equipment.name}</h2>

          {/* ===== Reviews ===== */}
          <div className="rating-summary">
            <div className="d-flex">
            <div className="stars-big pe-4">{renderStars(rating.average)}</div>
            <p>({rating.count} Reviews)</p>
            </div>
          </div>
          <hr />

          {/* ===== Rental Pricing ===== */}
          <div className="pricing-section">
            <h5>Rental Pricing</h5>
            <div className="pricing">
              <div className="price light">
                <p>Per Day</p>
                <strong>{equipment.pricePerDay} LE</strong>
              </div>
              <div className="price dark">
                <span className="save-badge">Save 15%</span>
                <p>Per Week</p>
                <strong>{equipment.pricePerDay * 7} LE</strong>
              </div>
            </div>
          </div>
          <hr />

          {/* ===== Specification ===== */}
          <div className="specification">
            <h5>Specification</h5>
            <ul className="specs">
              {equipment.description
                ?.split(".")
                .filter(Boolean)
                .map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= CALENDAR ================= */}
      <div className="calendar-section">
        <h4 className="main-color">Check Availability</h4>
        <div className="calendar">
          <div className="calendar-top">
            <div className="header">
              <button onClick={() => setCurrentMonth(new Date(year, month - 1))}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span>
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button onClick={() => setCurrentMonth(new Date(year, month + 1))}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="legend">
              <span>
                <i className="dot available"></i> Available
              </span>
              <span>
                <i className="dot occupied"></i> Occupied
              </span>
              <label className="select-radio">
                <input
                  type="radio"
                  checked={enableSelect}
                  onChange={() => setEnableSelect(true)}
                />
                Selected
              </label>
            </div>
          </div>

          <div className="grid ">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="day-name">{d}</span>
            ))}

            {Array(firstDay).fill("").map((_, i) => <span key={i}></span>)}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              let cls = "day";
              if (isBooked(day)) cls += " occupied";
              if (startDate && new Date(year, month, day).toDateString() === startDate.toDateString())
                cls += " selected";
              if (endDate && new Date(year, month, day).toDateString() === endDate.toDateString())
                cls += " selected";

              return (
                <span
                  key={day}
                  className={cls}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <h4 className="pt-4 main-color">User Reviews</h4>
      <div className="reviews-section">  
        <div className="d-flex justify-content-between">
        <div className="reviews-summary">
          <div className="average-rating">{rating.average.toFixed(1)}</div>
          <div className="stars-big">{renderStars(rating.average)}</div>
          <p>Based on {rating.count} reviews</p>
        </div>
        <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="bar">
                <span>{n}</span>
                <div className="progress">
                  <div style={{ width: percent(n) + "%" }}></div>
                </div>
                <span className="percent">{percent(n)}%</span>
              </div>
            ))}
          </div>
          </div>
        <hr />
        <div className="reviews-layout">
          
          <div className="reviews-list">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <img src={r.userImage || "https://i.pravatar.cc/50"} alt="" />
                <div>
                  <strong>{r.userName}</strong>
                  <div className="stars-inline">{renderStars(r.rating)}</div>
                  <p>{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BUTTON ================= */}
      <button
        className="rent-btn"
        disabled={!startDate || !endDate}
        onClick={() =>
          navigate(
            `/rent/${id}?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
          )
        }
      >
        <FontAwesomeIcon icon={faCalendarDays} /> Rent Now
      </button>
    </div>
  );
}

export default RentalDetails;


