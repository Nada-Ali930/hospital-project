import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";
import DoctorSidebar from "./DoctorSidebar";

export default function DoctorBookings() {
  const [operations, setOperations] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // ================= TOKEN =================
  const login = async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) return savedToken;

    const res = await axios.post(
      "http://graduationprojectapi.somee.com/api/Auth/login", // ✅ FIXED URL
      {
        email: "doctor1@hospital.com",
        password: "123456",
      }
    );

    localStorage.setItem("token", res.data.token);
    return res.data.token;
  };

  // ================= GET ALL BOOKINGS (Load All) =================
  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const t = await login();

      const res = await axios.get(
        "http://graduationprojectapi.somee.com/api/DoctorProfile/doctor/AllPatientbookings", // ✅ NEW ENDPOINT
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );

      setOperations(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET FILTERED BOOKINGS =================
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const t = await login();

      const res = await axios.get(
        "http://graduationprojectapi.somee.com/api/DoctorProfile/doctor/bookings", // ✅ CORRECT URL
        {
          params: {
            status: status || "",
            search: search || "",
          },
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );

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
      const t = await login();

      const res = await axios.get(
        `http://graduationprojectapi.somee.com/api/DoctorProfile/doctor/booking/${id}`, // ✅ CORRECT URL
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );

      console.log("Booking Details:", res.data);
      setBookingDetails(res.data);
      setShowDetailsModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (status === "" && search === "") {
      fetchAllBookings(); // Load all bookings when no filters
    } else {
      fetchBookings(); // Use filtered API when filters applied
    }
  }, [status, search]);

  // ================= FILTER (Frontend backup) =================
  const filteredOperations = operations.filter((op) => {
    const matchesStatus =
      !status || op.status?.toLowerCase() === status.toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      op.patientName?.toLowerCase().includes(searchValue) ||
      op.patientPhone?.includes(searchValue) ||
      op.patientEmail?.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  // Status Badge Class
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'pending';
      case 'confirmed': return 'confirmed';
      case 'completed': return 'completed';
      case 'canceled': return 'canceled';
      default: return 'pending';
    }
  };

  return (
    <>
      <div className="admin-layout">
        <div className="dashboard-container">

          <DoctorSidebar />

          <main className="main-content">
            <header>
              <h2>Reservations</h2>
              <p>Patient Reservations Management</p>
            </header>

            {/* SEARCH + FILTER */}
            <div className="filter-bar">
              <div className="search-wrapper">
                <FaSearch style={{ color: "#676767", fontSize: "16px" }} />
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
                  className={status === "confirmed" ? "active" : ""} 
                  onClick={() => setStatus("confirmed")}
                >
                  Confirmed
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-card">

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                  <p>Loading bookings...</p>
                </div>
              ) : filteredOperations.length === 0 ? (
                <div className="text-center py-5">
                  <p>No bookings found</p>
                </div>
              ) : (
                <Table borderless hover={false}>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOperations.map((op) => (
                      <tr key={op.bookingId}>
                        <td>
                          <span className="patient-name">{op.patientName}</span>
                          <br />
                          <span className="patient-phone">{op.patientPhone}</span>
                        </td>

                        <td>{op.patientEmail}</td>
                        <td>{op.date?.split("T")[0]}</td>
                        <td>{op.time}</td>
                        <td>{op.type}</td>

                        <td>
                          <span className={`status-badge ${getStatusClass(op.status)}`}>
                            {op.status}
                          </span>
                        </td>

                        <td>
                          <Button
                            variant="link"
                            className="btn-display"
                            onClick={() => getDetails(op.bookingId)}
                          >
                            Display
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

      {/* DETAILS MODAL */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
  {bookingDetails && (
    <div className="booking-details-container">

      <div className="detail-row">
        <span className="detail-label">Patient</span>
        <span className="detail-value">{bookingDetails.patientName}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Phone</span>
        <span className="detail-value">{bookingDetails.patientPhone}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Email</span>
        <span className="detail-value">{bookingDetails.patientEmail}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Date</span>
        <span className="detail-value">
          {bookingDetails.date?.split("T")[0]}
        </span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Time</span>
        <span className="detail-value">{bookingDetails.time}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Type</span>
        <span className="detail-value">{bookingDetails.type}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Status</span>
        <span className={`status-badge ${getStatusClass(bookingDetails.status)}`}>
          {bookingDetails.status}
        </span>
      </div>

      {bookingDetails.notes && (
        <div className="detail-row">
          <span className="detail-label">Notes</span>
          <span className="detail-value">{bookingDetails.notes}</span>
        </div>
      )}

      {bookingDetails.price && (
        <div className="detail-row">
          <span className="detail-label">Price</span>
          <span className="detail-value">${bookingDetails.price}</span>
        </div>
      )}

    </div>
  )}
</Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}