import React, { useEffect, useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import axios from "axios";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";

// ✅ axios instance
const api = axios.create({
  baseURL: "http://graduationprojectapi.somee.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default function OwnerBookings() {
  const [operations, setOperations] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookingDetails, setBookingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loadingId, setLoadingId] = useState(null);

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/EquipmentOwner/bookings", {
        params: {
          status: status || "booked",
          search: search || "",
        },
      });

      setOperations(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= DETAILS =================
  const getDetails = async (id) => {
    try {
      setLoadingId(id);

      const res = await api.get(`/EquipmentOwner/booking/${id}`);

      setBookingDetails(res.data);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  // ================= DEBOUNCE =================
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBookings();
    }, 500);

    return () => clearTimeout(delay);
  }, [status, search]);

  return (
    <>
      <div className="admin-layout">
        <div className="dashboard-container">

          <div className="sidebar">
            <OwnerSidebar />
          </div>

          <main className="main-content">
            <header>
              <h2>Reservations</h2>
              <p>Patient Reservations Management</p>
            </header>

            {/* SEARCH + FILTER */}
            <div className="filter-bar">
              <div className="search-wrapper">
                <FaSearch style={{ color: "#676767" }} />
                <input
                  type="text"
                  placeholder="Search by Name or Phone Number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="status-tabs">
                <button
                  className={status === "" ? "active" : ""}
                  onClick={() => setStatus("")}
                >
                  All
                </button>

                <button
                  className={status === "pending" ? "active" : ""}
                  onClick={() => setStatus("pending")}
                >
                  Pending
                </button>

                <button
                  className={status === "booked" ? "active" : ""}
                  onClick={() => setStatus("booked")}
                >
                  Booked
                </button>

                <button
                  className={status === "completed" ? "active" : ""}
                  onClick={() => setStatus("completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-card">
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              ) : operations.length === 0 ? (
                <p className="text-center">No bookings found</p>
              ) : (
                <Table borderless>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {operations.map((op) => (
                      <tr key={op.rentalId}>
                        <td>

                          <span className="patient-name">
                            {op.customerName}
                          </span>
                          <span className="patient-phone">
                            {op.customerPhone}
                          </span>
                        </td>

                        <td>{op.date?.split("T")[0]}</td>
                        <td>{op.time}</td>
                        <td>{op.deviceName || op.type}</td>

                        <td>
  <span className="status-badge">
    {op.status}
  </span>
</td>

                        <td>
                          <Button
                            variant="link"
                            className="btn-display"
                            onClick={() => getDetails(op.rentalId)}
                            disabled={loadingId === op.rentalId}
                          >
                            {loadingId === op.rentalId ? (
                              <Spinner size="sm" />
                            ) : (
                              "Display"
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* MODAL */}
<Modal 
  show={showModal} 
  onHide={() => setShowModal(false)} 
  centered
  className="custom-modal"
>
  <Modal.Header closeButton className="modal-header-custom">
    <Modal.Title className="modal-title-custom">Booking Details</Modal.Title>
  </Modal.Header>

  <Modal.Body className="modal-body-custom">
    {bookingDetails ? (
      <div className="booking-details-container">
        {/* 🔥 SHOW ALL FIELDS AUTOMATICALLY */}
        {Object.entries(bookingDetails).map(([key, value]) => (
          <div key={key} className="detail-row">
            <span className="detail-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="detail-value">
              {typeof value === 'string' && value.includes('T') 
                ? value.split('T')[0] 
                : value || 'N/A'}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <div className="loading-container">
        <Spinner animation="border" size="sm" className="loading-spinner" />
        <p className="loading-text">Loading details...</p>
      </div>
    )}
  </Modal.Body>
</Modal>

      <Footer />
    </>
  );
}