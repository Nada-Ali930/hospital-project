import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaBell,
  FaChartLine,
  FaCalendarCheck,
  FaGlobe,
  FaSignOutAlt,
  FaCamera
} from "react-icons/fa";
const DoctorSidebar = () => {
  const navigate = useNavigate();

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
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="doctor"
                  className="profile-img"
                />
              </div>
              <label className="upload-icon">
  <FaCamera style={{ color: "white", fontSize: "14px" }} />
  <input type="file" hidden />
</label>
            </div>
            <h5 className="mt-3 fw-bold">Ali L.</h5>
            <p className="profile-id">Patient ID : #HE-92301</p>
            <div className="menu">
              <NavLink 
  to="/profile" 
  className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
>
                <div className="icon-wrapper">
                  <FaUserMd className="menu-icon" />
                </div>
                <span>Personal Information</span>
              </NavLink>
              <NavLink 
  to="/notifications"
  className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
>
                <div className="icon-wrapper">
                  <FaBell className="menu-icon" />
                </div>
                <span>Notification Settings</span>
              </NavLink>
              <NavLink 
  to="/dashboard" 
  className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
>
                <div className="icon-wrapper">
                  <FaChartLine className="menu-icon" />
                </div>
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink 
  to="/Doctor-bookings"
  className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
>
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
            <FaSignOutAlt className="menu-icon" />
            <span>Log out</span>
          </div>
            </div>
          </div>
  </div>
);
};

export default DoctorSidebar;
