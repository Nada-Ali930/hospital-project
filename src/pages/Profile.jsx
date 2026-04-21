import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaUser, FaBell, FaGlobe, FaSignOutAlt, FaBox } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import footerLogo from "../assets/images/footerlogo.png";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    imageUrl: "",
    userId: ""
  });

  const token =
  localStorage.getItem("token") || sessionStorage.getItem("token");
  console.log("TOKEN:", token);
  const api = "http://graduationprojectapi.somee.com/api";
  const { t, i18n } = useTranslation();

  // ================= CustomDropdown =================
  const CustomDropdown = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };
  return (
    <div className="custom-dropdown" ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <div
        className="dropdown-header border d-flex justify-content-between align-items-center px-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div
          className="dropdown-menu-custom position-absolute w-100 mt-1"
          style={{ zIndex: 10 }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item-custom"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  // ================= API Calls =================
  const getProfile = async () => {
  try {
    const res = await axios.get(`${api}/Profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProfile({
      ...res.data,
      imageUrl: res.data.imageUrl
  ? `http://graduationprojectapi.somee.com${res.data.imageUrl}`
  : ""
    });

  } catch (err) {
    console.log(err);
  }
};
const discardChanges = () => {
  getProfile();
};

  const updateProfile = async () => {
  try {

    const body = {
      name: profile.name,
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.split("T")[0]
        : null,
      gender: profile.gender,
      phone: profile.phone,
      email: profile.email
    };

    await axios.put(`${api}/Profile`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Profile Updated Successfully");

    getProfile();

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

 const uploadImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      `${api}/Profile/upload-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setProfile(prev => ({
      ...prev,
      imageUrl:
        `http://graduationprojectapi.somee.com${res.data.imageUrl}`
    }));

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getProfile();
  }, []);

  // ================= JSX =================
  return (
    <div className="profile-page">
      <Container className="pt-5">
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <Card className="sidebar-card text-center">
              <div className="profile-img-container">
                <div className="profile-img-wrapper">
                  <img
  src={
    profile.imageUrl
      ? profile.imageUrl
      : "https://via.placeholder.com/120"
  }
  alt="profile"
  className="profile-img"
/>

                </div>
                <label className="upload-icon">
                  <i className="fa-regular fa-camera"></i>
                  <input type="file" hidden onChange={uploadImage} />
                </label>
              </div>

              <h5 className="mt-3 fw-bold">{profile.name || "Username"}</h5>
              <p className="profile-id">Patient ID : #HE-{profile.userId || "0000"}</p>

              <div className="menu">
                <div className="menu-item active">
                  <div className="icon-wrapper">
                    <FaUser className="menu-icon" />
                  </div>
                  <span>{t("menuPersonal")}</span>
                </div>

                <div className="menu-item">
                  <div className="icon-wrapper">
                    <FaBox className="menu-icon" />
                  </div>
                  <span>{t("menuRentals")}</span>
                </div>

                <div className="menu-item">
                  <div className="icon-wrapper">
                    <FaBell className="menu-icon" />
                  </div>
                  <span>{t("menuNotifications")}</span>
                </div>

                <div className="menu-item">
                  <div className="icon-wrapper">
                    <FaGlobe className="menu-icon" />
                  </div>
                  <span>{t("menuLanguage")}</span>
                </div>

                <div className="menu-item logout">
                  <FaSignOutAlt className="menu-icon" />
                  <span>{t("logout")}</span>
                </div>
              </div>
            </Card>
          </Col>

          {/* Content */}
          <Col md={9}>
            {/* Personal Info */}
            <Card className="content-card p-4 mb-4">
              <h4 className="text-center fw-bold mb-4">{t("personalInfo")}</h4>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>{t("name")}</Form.Label>
                  <Form.Control
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("date")}</Form.Label>
                  <Form.Control
                    type="date"
                    value={profile.dateOfBirth?.split("T")[0]}
                    onChange={(e) =>
                      setProfile({ ...profile, dateOfBirth: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("gender")}</Form.Label>
                  <CustomDropdown
                    options={[t("male"), t("female")]}
                    selected={profile.gender}
                    placeholder={t("selectGender")}
                    onChange={(value) => setProfile({ ...profile, gender: value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("phone")}</Form.Label>
                  <Form.Control
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>{t("email")}</Form.Label>
                  <Form.Control
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Card>

            {/* Notification Settings */}
            <Card className="content-card p-4 mb-4">
              <h5 className="fw-bold mb-3">{t("notificationTitle")}</h5>
              <div className="settings-box">
                <div className="settings-row">
                  <div className="settings-left">
                    <div className="settings-icon">
                      <FaBell />
                    </div>
                    <div>
                      <strong>{t("appointment")}</strong>
                      <p>{t("appointmentDesc")}</p>
                    </div>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </div>

                <div className="settings-row">
                  <div className="settings-left">
                    <div className="settings-icon">
                      <FaBox />
                    </div>
                    <div>
                      <strong>{t("equipment")}</strong>
                      <p>{t("equipmentDesc")}</p>
                    </div>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </div>
              </div>
            </Card>

            {/* Language */}
            <Card className="content-card p-4 mb-4">
              <h5 className="fw-bold">{t("selectLanguage")}</h5>
              <p className="text-muted mb-3">{t("languageDesc")}</p>
              <div className="settings-box">
                <div className="language-buttons">
                  <button
                    className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
                    onClick={() => {
                      i18n.changeLanguage("en");
                      document.body.dir = "ltr";
                    }}
                  >
                    English
                  </button>
                  <button
                    className={`lang-btn ${i18n.language === "ar" ? "active" : ""}`}
                    onClick={() => {
                      i18n.changeLanguage("ar");
                      document.body.dir = "rtl";
                    }}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </Card>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3">
              <Button
  type="button"
  className="btn-discard"
  onClick={discardChanges}
>
  Discard
</Button>
              <Button type="button" className="btn-save" onClick={updateProfile}>
                <i className="fa-regular fa-floppy-disk me-2"></i>
                Save Changes
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer mt-5">
        <Container>
          <Row className="gy-4">
            <Col md={4}>
              <h5 className="footer-logo">
                <img src={footerLogo} alt="Healthcare Team" className="img-fluid" />
              </h5>
              <p className="footer-text">
                Your trusted partner for healthcare solutions and medical equipment.
              </p>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">Quick Links</h6>
              <ul className="footer-links">
                <li>Find Hospitals</li>
                <li>Rent Equipment</li>
                <li>AI Assistant</li>
              </ul>
            </Col>

            <Col md={3}>
              <h6 className="footer-title">Support</h6>
              <ul className="footer-links">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>

            <Col md={3}>
              <h6 className="footer-title">Contact</h6>
              <p className="footer-text mb-1">Email: support@MedRent.com</p>
              <p className="footer-text mb-1">Phone: 1-800-HEALTH</p>
              <p className="footer-text">Address: 123 Medical St, City</p>
            </Col>
          </Row>

          <hr className="footer-line" />
          <p className="footer-copy text-center">© 2025 MedRent. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}