import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserMd,
  FaBell,
  FaChartLine,
  FaCalendarCheck,
  FaGlobe,
  FaSignOutAlt,
  FaCamera
} from "react-icons/fa";

const BASE_URL = "http://graduationprojectapi.somee.com";
const api = `${BASE_URL}/api`;

const DoctorSidebar = () => {
  const [profile, setProfile] = useState({
    name: "Ali L.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    userId: "92301"
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const getProfile = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${api}/Profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile((prev) => ({
        ...prev,
        name: res.data.name || prev.name,
        imageUrl: res.data.imageUrl
          ? `${BASE_URL}${res.data.imageUrl}`
          : prev.imageUrl,
        userId: res.data.userId || prev.userId
      }));

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${api}/Profile/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        imageUrl: `${BASE_URL}${res.data.imageUrl}`,
      }));

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [token]);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-card text-center">

        <div className="profile-img-container">
          <div className="profile-img-wrapper">
            <img
              src={profile.imageUrl}
              alt="doctor"
              className="profile-img"
            />
          </div>

          <label className="upload-icon" htmlFor="profile-upload">
            <FaCamera style={{ color: "white", fontSize: "14px" }} />
            <input
              id="profile-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={uploadImage}
            />
          </label>
        </div>

        <h5 className="mt-3 fw-bold">
          {loading ? "Loading..." : profile.name}
        </h5>

        <p className="profile-id">
          Doctor ID : #HE-{profile.userId}
        </p>

        <div className="menu">

          <NavLink to="/profile" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <div className="icon-wrapper">
              <FaUserMd className="menu-icon" />
            </div>
            <span>Personal Information</span>
          </NavLink>

          <NavLink to="/notifications" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <div className="icon-wrapper">
              <FaBell className="menu-icon" />
            </div>
            <span>Notification</span>
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <div className="icon-wrapper">
              <FaChartLine className="menu-icon" />
            </div>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/Doctor-bookings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <div className="icon-wrapper">
              <FaCalendarCheck className="menu-icon" />
            </div>
            <span>Bookings</span>
          </NavLink>

          <div className="menu-item">
            <div className="icon-wrapper">
              <FaGlobe className="menu-icon" />
            </div>
            <span>Language</span>
          </div>

          <div className="menu-item logout" onClick={logout}>
            <div className="icon-wrapper">
              <FaSignOutAlt className="menu-icon" />
            </div>
            <span>Log out</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;