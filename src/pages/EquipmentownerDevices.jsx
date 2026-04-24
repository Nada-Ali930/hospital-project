import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import OwnerSidebar from "./OwnerSidebar";
import deviceIcon from "../assets/images/deviceIcon.png"; 
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function EquipmentownerDevices() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ FIXED: Correct API base URL & endpoint
  const API = axios.create({
    baseURL: "http://graduationprojectapi.somee.com/api",
  });

  // Request interceptor for token
  API.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  // Response interceptor to handle token expiration
  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuth(false);
        setDevices([]);
      }
      return Promise.reject(error);
    }
  );

  // ✅ FIXED: Correct login endpoint
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    
    try {
      const res = await axios.post(
        "http://graduationprojectapi.somee.com/api/Auth/login", 
        { 
          email: email.trim(), 
          password: password 
        }
      );
      
      const newToken = res.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setIsAuth(true);
      
      // Fetch devices after successful login
      await getDevices();
      
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setLoginError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // ✅ FIXED: Correct devices endpoint & field mapping
  const getDevices = async () => {
    setLoading(true);
    try {
      const response = await API.get("/EquipmentOwner/devices"); // ✅ CORRECT ENDPOINT
      console.log("✅ Devices response:", response.data);
      
      // ✅ Map API response to match UI expectations
      const mappedDevices = response.data.map(device => ({
        equipmentId: device.equipmentId,
        name: device.name,
        description: device.description,
        pricePerDay: device.pricePerDay,
        rating: device.rating,
        status: device.status
      }));
      
      setDevices(mappedDevices);
    } catch (error) {
      console.error("❌ Error fetching devices:", error.response?.data);
      setDevices([]);
    } finally {
      setLoading(false);
    }
  };

  // Check auth and fetch devices on mount/update
  useEffect(() => {
    if (token) {
      // Verify token is valid for EquipmentOwner
      API.get("/EquipmentOwner/devices")
        .then(() => {
          setIsAuth(true);
          getDevices();
        })
        .catch(() => {
          // Invalid token, show login
          localStorage.removeItem("token");
          setToken(null);
          setIsAuth(false);
        });
    }
  }, [token]);

  const getStatusStyle = (status) => {
    const normalizedStatus = status === "Avaliable" ? "Available" : status;
    
    if (normalizedStatus === "Available")
      return { bg: "#8be2ea", color: "#18268b" };
    if (normalizedStatus === "Booked")
      return { bg: "#8bea95", color: "#188b1e" };
    return { bg: "#ecb26a", color: "#84650f" };
  };

  // ================= LOGIN UI =================
  if (!isAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card style={{ width: 400, padding: 30, borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <Card.Body className="text-center">
            <h4 className="mb-4">Equipment Owner Login</h4>
            <p className="text-muted mb-4 small">
              Use one of these accounts:
              <br />
              <strong>marwawageeh47@gmail.com</strong> / marwawageeh47@
              <br />
              <strong>mafam764@gmail.com</strong> / mafam764@
              <br />
              <strong>Hadeer12@gmail.com</strong> / Hadeer12@
            </p>
            
            {loginError && (
              <Alert variant="danger" className="mb-3">{loginError}</Alert>
            )}
            
            <Form onSubmit={handleLogin}>
              <Form.Control
                type="email"
                placeholder="Email"
                className="mb-3 rounded-pill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginLoading}
                required
              />
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-4 rounded-pill"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginLoading}
                required
              />
              <Button className="w-100 rounded-pill py-2 fw-bold" type="submit" disabled={loginLoading}>
                {loginLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // ================= DEVICES UI =================
  return (
    <>
      <div className="devices-page">
        <Container fluid>
  <Row>
    {/* Sidebar */}
    <Col md={3} lg={3}>
      <OwnerSidebar />
    </Col>

    {/* Main */}
    <Col md={9} lg={9} className="main-content">
      
      {/* Header */}
      <div className="devices-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>My Devices ({devices.length})</h3>
          <p>Manage Registered Devices</p>
        </div>

        <Button
          className="add-btn fw-bold"
          onClick={() => navigate("/equipmentowner-add-device")}
        >
          Add Device +
        </Button>
      </div>

      {/* Devices */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4 devices-grid">
          {devices.map((device) => {
            const style = getStatusStyle(device.status);

            return (
              <Col md={6} key={device.equipmentId}>
                <Card className="device-card h-100">
                  <Card.Body>

                    {/* Top */}
                    <div className="device-top">
                      <div className="device-title">
  <span className="device-name">{device.name}</span>

  <div className="device-icon">
    <img src={deviceIcon} alt="" />
  </div>
</div>

                      <span
                        className="status-badge"
                        style={{
                          background: style.bg,
                          color: style.color,
                        }}
                      >
                        {device.status === "Avaliable"
                          ? "Available"
                          : device.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="device-desc">
                      {device.description}
                    </p>

                    {/* Bottom */}
                    <div className="device-bottom">
                      <span className="device-price">
                        From ${device.pricePerDay}/day
                      </span>

                      <div className="device-rating">
                        <span>{device.rating}</span>
                        <FaStar />
                      </div>
                    </div>

                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Col>
  </Row>
</Container>
      </div>
      <Footer />
    </>
  );
}