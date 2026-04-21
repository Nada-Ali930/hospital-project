import React, { useEffect, useState } from "react";
import axios from "axios";
import pana from "../assets/images/pana.png";
import {
  HeartPulse,
  Brain,
  Baby,
  Microscope,
  Bone,
  Eye,
  Stethoscope,
  Activity,
} from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Tabs,
  Tab,
} from "react-bootstrap";

const BookingPage = () => {
  const hospitalId = 30;

  const [departments, setDepartments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  

 const departmentIcons = {
   Cardiology: <HeartPulse />,
   Neurology: <Brain />,
   Pediatrics: <Baby />,
   Oncology: <Microscope />,
   Orthopedics: <Bone />,
   Ophthalmology: <Eye />,
   "General Medicine": <Stethoscope />,
   Surgery: <Activity />,
   Emergency: <Activity />,
 };

 
  const formatDateForApi = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get(
        `http://graduationprojectapi.somee.com/api/Hospital/${hospitalId}/booking-details`
      )
      .then((res) => {
  setDepartments(res.data.departments);

  const doctors = res.data.departments.flatMap((d) => d.doctors);
  setAllDoctors(doctors);
  setFilteredDoctors(doctors);

  const uniqueSpecs = [
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];
  setSpecializations(uniqueSpecs);
})
      .catch((err) => console.log(err));
  }, []);

const CustomDropdown = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
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
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || placeholder}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`dropdown-item ${selected === opt ? "selected" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  /* ================= Departments ================= */
  const handleDepartmentClick = (dep) => {
    setSelectedDepartment(dep.departmentId);
    setFilteredDoctors(dep.doctors);
  };

  /* ================= Doctors ================= */
  const handleDoctorClick = (docId) => {
    setSelectedDoctor(docId);

    if (selectedDate) {
      const formattedDate = formatDateForApi(selectedDate);

      axios
        .get(
          `http://graduationprojectapi.somee.com/api/Hospital/doctor/${docId}/available-times?date=${formattedDate}`
        )
        .then((res) => setAvailableTimes(res.data))
        .catch((err) => console.log(err));
    }
  };

  /* ================= Calendar Logic ================= */

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date) => {
    if (!date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return;

    setSelectedDate(date);

    if (selectedDoctor) {
      const formattedDate = formatDateForApi(date);

      axios
        .get(
          `http://graduationprojectapi.somee.com/api/Hospital/doctor/${selectedDoctor}/available-times?date=${formattedDate}`
        )
        .then((res) => setAvailableTimes(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="booking-wrapper container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <div className="booking-title">
            <div className="back-circle">
              <i
                className="fa-solid fa-arrow-left"
                style={{ color: "#031B4E", fontSize: "16px" }}
              ></i>
            </div>
            <h4>Schedule Your booking</h4>
          </div>

          <div className="calendar-card">
            {/* Header */}
            <div className="calendar-header">
              <div className="month-left">
                <span className="month-title">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {currentDate.getFullYear()}
                </span>
                <span className="small-arrow">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>

              <div className="month-arrows">
                <button
                  onClick={() => changeMonth(-1)}
                  className="month-arrow"
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="month-arrow"
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>

            {/* Week Days */}
            <div className="calendar-week">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="calendar-grid">
              {getDaysInMonth(currentDate).map((date, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const isPast = date && date < today;
                const isSelected =
                  date &&
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString();

                return (
                  <div
                    key={index}
                    className={`calendar-day 
                      ${isPast ? "disabled" : ""} 
                      ${isSelected ? "selected" : ""}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                );
              })}
            </div>

            <div className="calendar-time">
              <span>Time</span>
              <div className="time-pill-main">
                {selectedDate
                  ? selectedDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "9:41 AM"}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <img src={pana} alt="doctor" className="hero-img" />
        </div>
      </div>

      <h5 className="section-title">Available Departments</h5>

<Row className="mt-3 g-3">
  {departments.map((dep) => (
    <Col xs={6} md={4} lg={2} key={dep.departmentId}>
      <Card
        className={`department-card border-0 text-center ${
          selectedDepartment === dep.departmentId ? "active" : ""
        }`}
        onClick={() => handleDepartmentClick(dep)}
      >
        <div className="department-icon">
          {React.cloneElement(
            departmentIcons[dep.name] || <Stethoscope />,
            { size: 22, color: "#007bff", strokeWidth: 2 }
          )}
        </div>

        <p className="department-name">{dep.name}</p>
      </Card>
    </Col>
  ))}
</Row>
      {/* ================= Doctors ================= */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h5 className="section-title">Available Doctors</h5>

        <CustomDropdown
  options={["All Specialties", ...specializations]}
  selected={selectedSpecialty}
  placeholder="Select Specialty"
  onChange={(value) => {
    setSelectedSpecialty(value);

    if (value === "All Specialties") {
      setFilteredDoctors(allDoctors);
    } else {
      const filtered = allDoctors.filter(
        (doc) => doc.specialization === value
      );
      setFilteredDoctors(filtered);
    }
  }}
/>
      </div>

      <Row className="g-4 mt-3">
        {filteredDoctors.map((doc) => (
          <Col md={4} key={doc.doctorId}>
            <Card className="doctor-card border-0 p-3 shadow-sm">
              <div className="d-flex align-items-center gap-3">
                <div className="doctor-img">
                  <div className="doctor-initials">
                    {doc.name.split(" ")[1]?.charAt(0)}
                  </div>
                </div>

                <div>
                  <h6 className="doctor-name">{doc.name}</h6>
                  <span className="doctor-exp">{doc.experienceYears} years experience</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="mt-3 d-flex align-items-center gap-2">
  <i className="fa-regular fa-clock" style={{ color: "#676767" }}></i>
  <small className="available-text" style={{ color: "#676767" }}>
    Available Today
  </small>
  </div>

                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {(selectedDoctor === doc.doctorId &&
                  availableTimes.length > 0
                    ? availableTimes.slice(0, 3)
                    : ["09:00", "10:30", "12:00"]
                  ).map((time, i) => (
                    <span key={i} className="time-pill">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                className="w-100 mt-3 book-btn"
                onClick={() => handleDoctorClick(doc.doctorId)}
              >
                Book Appointment
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookingPage;