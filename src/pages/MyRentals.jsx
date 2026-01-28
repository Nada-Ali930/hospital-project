import React, { useState } from "react";
import { Link } from "react-router-dom";

import wheelchair from "../assets/images/nebulizer.jpg";
import lift from "../assets/images/wheelchair.jpg";
import bed from "../assets/images/lift.jpg";

const rentalsData = [
  {
    id: 1,
    name: "Electric wheelchair",
    image: wheelchair,
    status: "Active",
    period: "21 Nov 2025 - 23 Nov 2025",
  },
  {
    id: 2,
    name: "Electric Patient Lift",
    image: lift,
    status: "Completed",
    period: "21 Oct 2025 - 23 Nov 2025",
  },
  {
    id: 3,
    name: "Medical bed",
    image: bed,
    status: "Pending Return",
    period: "27 Nov 2025 - 23 Nov 2025",
  },
  {
    id: 4,
    name: "Electric wheelchair",
    image: wheelchair,
    status: "Completed",
    period: "10 Nov 2025 - 15 Nov 2025",
  },
  {
    id: 5,
    name: "Medical bed",
    image: bed,
    status: "Active",
    period: "1 Dec 2025 - 10 Dec 2025",
  },
];

const ITEMS_PER_PAGE = 3;

function MyRentals() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* SEARCH */
  const filteredRentals = rentalsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /*  PAGINATION  */
  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredRentals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="my-rentals">
    <div className=" container">
      <h3 className="page-title">My Rentals</h3>

      {/* Search */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by equipment name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Cards */}
      <div className="row">
        {currentItems.length === 0 ? (
          <p className="text-center text-muted">No rentals found</p>
        ) : (
          currentItems.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="rental-card">
                <span className={`status ${item.status.replace(" ", "-")}`}>
                  {item.status}
                </span>

                <img src={item.image} alt={item.name} />

                <h5 className="left">{item.name}</h5>
                <p className="left">Rental Period: {item.period}</p>

                <Link
                  to={`/rentals/${item.id}`}
                  className="details-btn text-center text-decoration-none "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default MyRentals;