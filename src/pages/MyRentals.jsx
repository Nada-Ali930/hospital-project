import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 3;

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.uid;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    fetchMyRentals(userId, token, search);
  }, [search]);

  
  const fetchMyRentals = async (userId, token, searchValue = "") => {
    try {
      setLoading(true);

      let url = `/api/Profile/${userId}`;
      if (searchValue.trim() !== "") {
        url = `/api/Profile/search?userId=${userId}&name=${encodeURIComponent(
          searchValue
        )}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rentalsData = response.data;

      
      const rentalsWithEquipmentId = await Promise.all(
        rentalsData.map(async (rental) => {
          try {
            const eqRes = await axios.get("/api/Equipment/search", {
              params: { name: rental.equipmentName },
            });

            const equipment = eqRes.data.find(
              (eq) => eq.name.toLowerCase() === rental.equipmentName.toLowerCase()
            );

            return { ...rental, equipmentId: equipment?.equipmentId || null };
          } catch {
            return { ...rental, equipmentId: null };
          }
        })
      );

      setRentals(rentalsWithEquipmentId);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching my rentals", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

 
  const totalPages = Math.ceil(rentals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = rentals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
   <div className="rental-bg">
    <div className="my-rentals">
      <div className="container">
        <h3 className="page-title">My Rentals</h3>

        
        <input
          type="text"
          className="search-input"
          placeholder="Search by equipment name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="text-center">Loading...</p>}

        <div className="row">
          {!loading && currentItems.length === 0 ? (
            <p className="text-center text-muted">No equipment found</p>
          ) : (
            currentItems.map((item) => (
              <div className="col-md-4" key={item.rentalId}>
                <div className="rental-card">
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>

                  <img
                    src={`http://www.graduationproject.somee.com${item.imageUrl}`}
                    alt={item.equipmentName}
                  />

                  <h5 className="left">{item.equipmentName}</h5>
                  <p className="left">Total Price: {item.totalPrice} EGP</p>
                  
                  {item.equipmentId ? (
                    <Link
                      to={`/rentals/${item.equipmentId}`}
                      className="details-btn text-center text-decoration-none"
                    >
                      View Details
                    </Link>
                  ) : (
                    <span className="text-muted">No Details</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
   </div>
  );
}

export default MyRentals;



