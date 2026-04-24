// import React from "react";
// import { Line, Pie, Bar } from "react-chartjs-2";
// import { Container, Row, Col } from "react-bootstrap";
// import footerLogo from "../assets/images/footerlogo.png";
// import { NavLink } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Tooltip,
//   Legend
// } from "chart.js";


// import clockIcon from "../assets/images/Clock.png";
// import noteIcon from "../assets/images/note-icon.png";
// import peopleIcon from "../assets/images/people-icon.png";
// import rateIcon from "../assets/images/rate.png";

// import {
//   FaUserMd,
//   FaBell,
//   FaChartLine,
//   FaCalendarCheck,
//   FaGlobe,
//   FaSignOutAlt
// } from "react-icons/fa";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Tooltip,
//   Legend
// );

// const DoctorDashboard = () => {

//   //  Weekly Chart Data
//   const weeklyData = {
//     labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
//     datasets: [
//       {
//         data: [5, 15, 12, 21, 14, 16, 0],
//         borderColor: "#8ecae6",
//         fill: true,
//         tension: 0.5,
//         borderWidth: 2,
//         pointRadius: 0,
//         backgroundColor: (context) => {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;
//           if (!chartArea) return null;
//           const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//           gradient.addColorStop(0, "rgba(142,202,230,0.6)");
//           gradient.addColorStop(1, "rgba(142,202,230,0)");
//           return gradient;
//         }
//       }
//     ]
//   };

//   const weeklyOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: { display: true, color: "rgba(0,0,0,0.05)" },
//         ticks: { color: "#000", font: { size: 13 } }
//       },
//       y: {
//         min: 0,
//         max: 28,
//         ticks: { stepSize: 7, color: "#000" },
//         grid: { display: true, color: "rgba(0,0,0,0.05)" }
//       }
//     },
//     plugins: { legend: { display: false } }
//   };

//   // ✅ Pie Chart Data
//   const pieData = {
//     labels: ["General Check-up", "Follow-up", "Consultation", "Emergency"],
//     datasets: [{
//       data: [45, 30, 10, 15],
//       backgroundColor: ["#5ea1c2", "#e28361", "#d75795", "#5d7dd8"],
//       borderWidth: 0
//     }]
//   };

//   const pieOptions = { 
//     plugins: { legend: { display: false } },
//     radius: "70%" 
//   };

//   // Bar Chart Data
//   const barData = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [{
//       data: [140, 190, 80, 15, 55, 150],
//       backgroundColor: "#6080DBF2",
//       borderRadius: 5,
//       barThickness: 40
//     }]
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: {
//       y: { beginAtZero: true, max: 200, ticks: { stepSize: 50 } },
//       x: { grid: { display: false } }
//     }
//   };

//   return (
//     <>
//       <div className="dashboard">
//         <div className="body">
//           {/* SIDEBAR */}
// <div className="sidebar-card text-center">

//   <div className="profile-img-container">
//     <div className="profile-img-wrapper">
//       <img
//         src="https://randomuser.me/api/portraits/men/32.jpg"
//         alt="doctor"
//         className="profile-img"
//       />
//     </div>

//     <label className="upload-icon">
//       <i className="fa-regular fa-camera"></i>
//       <input type="file" hidden />
//     </label>
//   </div>

//   <h5 className="mt-3 fw-bold">Ali L.</h5>
//   <p className="profile-id">Patient ID : #HE-92301</p>

//   <div className="menu">

//     <NavLink to="/profile" className="menu-item">
//       <div className="icon-wrapper">
//         <FaUserMd className="menu-icon" />
//       </div>
//       <span>Personal Information</span>
//     </NavLink>

//     <div className="menu-item">
//       <div className="icon-wrapper">
//         <FaBell className="menu-icon" />
//       </div>
//       <span>Notification Settings</span>
//     </div>

//     <NavLink to="/dashboard" className="menu-item">
//       <div className="icon-wrapper">
//         <FaChartLine className="menu-icon" />
//       </div>
//       <span>Dashboard</span>
//     </NavLink>

//     <div className="menu-item">
//       <div className="icon-wrapper">
//         <FaCalendarCheck className="menu-icon" />
//       </div>
//       <span>Bookings</span>
//     </div>

//     <div className="menu-item">
//       <div className="icon-wrapper">
//         <FaGlobe className="menu-icon" />
//       </div>
//       <span>Language</span>
//     </div>

//     <div className="menu-item logout">
//       <div className="icon-wrapper">
//         <FaSignOutAlt className="menu-icon" />
//       </div>
//       <span>Log out</span>
//     </div>

//   </div>
// </div>

//           {/* MAIN */}
//           <div className="main">
//             <div className="cards-dashboard">
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={peopleIcon} alt="people" /></div>
//                 <div><h2>1248</h2><p>Total Patients</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={noteIcon} alt="note" /></div>
//                 <div><h2>18</h2><p>Today's Bookings</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={clockIcon} alt="clock" /></div>
//                 <div><h2>4</h2><p>Pending Patients</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={rateIcon} alt="rate" /></div>
//                 <div><h2>94%</h2><p>Satisfaction Rate</p></div>
//               </div>
//             </div>

//             {/* WEEKLY CHART */}
//             <div className="chart-box">
//               <h3>Weekly Reservations</h3>
//               <div style={{ height: '250px' }}>
//                 <Line data={weeklyData} options={weeklyOptions} />
//               </div>
//             </div>

//             {/* TWO CHARTS */}
//             <div className="charts">
//               <div className="chart-box">
//                 <h3>Types of Appointments</h3>
//                 <Pie data={pieData} options={pieOptions} />
//                 <div className="custom-legend">
//                   <div><span className="dot blue"></span><span className="label">General Check-up</span><span className="value">45%</span></div>
//                   <div><span className="dot orange"></span><span className="label">Follow-up</span><span className="value">30%</span></div>
//                   <div><span className="dot pink"></span><span className="label">Consultation</span><span className="value">10%</span></div>
//                   <div><span className="dot darkblue"></span><span className="label">Emergency</span><span className="value">15%</span></div>
//                 </div>
//               </div>

//               <div className="chart-box">
//                 <h3>Monthly Patients</h3>
//                 <div className="chart-container">
//                   <Bar data={barData} options={barOptions} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="footer mt-5">
//               <Container>
//                 <Row className="gy-4">
//                   <Col md={4}>
//                     <h5 className="footer-logo">
//                       <img src={footerLogo} alt="Healthcare Team" className="img-fluid" />
//                     </h5>
//                     <p className="footer-text">
//                       Your trusted partner for healthcare solutions and medical equipment.
//                     </p>
//                   </Col>
      
//                   <Col md={2}>
//                     <h6 className="footer-title">Quick Links</h6>
//                     <ul className="footer-links">
//                       <li>Find Hospitals</li>
//                       <li>Rent Equipment</li>
//                       <li>AI Assistant</li>
//                     </ul>
//                   </Col>
      
//                   <Col md={3}>
//                     <h6 className="footer-title">Support</h6>
//                     <ul className="footer-links">
//                       <li>Help Center</li>
//                       <li>Contact Us</li>
//                       <li>Privacy Policy</li>
//                     </ul>
//                   </Col>
      
//                   <Col md={3}>
//                     <h6 className="footer-title">Contact</h6>
//                     <p className="footer-text mb-1">Email: support@MedRent.com</p>
//                     <p className="footer-text mb-1">Phone: 1-800-HEALTH</p>
//                     <p className="footer-text">Address: 123 Medical St, City</p>
//                   </Col>
//                 </Row>
      
//                 <hr className="footer-line" />
//                 <p className="footer-copy text-center">© 2025 MedRent. All rights reserved.</p>
//               </Container>
//             </footer>
//     </>
//   );
// }; 

// export default DoctorDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import DoctorSidebar  from "./DoctorSidebar";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import clockIcon from "../assets/images/Clock.png";
import noteIcon from "../assets/images/note-icon.png";
import peopleIcon from "../assets/images/people-icon.png";
import rateIcon from "../assets/images/rate.png";

import {
  FaUserMd,
  FaBell,
  FaChartLine,
  FaCalendarCheck,
  FaGlobe,
  FaSignOutAlt
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const DoctorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          console.warn('No authentication token found. Using default data.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'http://graduationprojectapi.somee.com/api/DoctorProfile/doctor/dashboard',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('API Response:', response.data); // Debug
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        console.log('Using default data as fallback');
        setError('Using default data (API unavailable)');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Default data for fallback
  const defaultData = {
    totalPatients: 1248,
    todayBookings: 18,
    waitingCount: 4,
    rating: 94,
    bookingTypes: [],
    weeklyBookings: [],
    monthlyPatients: []
  };

  const data = dashboardData || defaultData;

  // ✅ FIXED Weekly Chart Data - THE ONLY CHANGE NEEDED
  const getWeeklyData = () => {
    const weeklyBookings = data.weeklyBookings || [];
    const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const counts = new Array(7).fill(0);

    const dayMapping = {
      "Sunday": 1, "Monday": 2, "Tuesday": 3, "Wednesday": 4, 
      "Thursday": 5, "Friday": 6, "Saturday": 0
    };

    weeklyBookings.forEach(booking => {
      const dayIndex = dayMapping[booking.day];
      if (dayIndex !== undefined) { // ✅ FIXED: This was broken!
        counts[dayIndex] = booking.count;
      }
    });

    console.log('Weekly chart data:', counts); // Debug

    return {
      labels,
      datasets: [
        {
          data: counts,
          borderColor: "#8ecae6",
          fill: true,
          tension: 0.5,
          borderWidth: 2,
          pointRadius: 4,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(142,202,230,0.6)");
            gradient.addColorStop(1, "rgba(142,202,230,0)");
            return gradient;
          }
        }
      ]
    };
  };

  const weeklyData = getWeeklyData();
  const weeklyValues = weeklyData.datasets[0].data;
  const maxWeekly = Math.max(...weeklyValues, 0);

  // Weekly Options
  const weeklyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        grid: { display: true, color: "rgba(0,0,0,0.05)" },
        ticks: { color: "#666", font: { size: 13 } }
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: maxWeekly > 0 ? Math.max(maxWeekly * 1.2, 7) : 7,
        ticks: {
          stepSize: maxWeekly > 0 ? Math.ceil(maxWeekly / 4) : 1,
          color: "#666"
        },
        grid: { display: true, color: "rgba(0,0,0,0.05)" }
      }
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        enabled: true
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  // Pie Chart Data
  const getPieData = () => {
    const defaultTypes = [
      { type: "General Checkup", color: "#5ea1c2" },
      { type: "Follow Up", color: "#e28361" },
      { type: "Consultation", color: "#d75795" },
      { type: "Emergency", color: "#5d7dd8" }
    ];

    const bookingTypes = data.bookingTypes || [];

    const merged = defaultTypes.map((item) => {
      const found = bookingTypes.find(
        (bt) => bt.type?.toLowerCase() === item.type.toLowerCase()
      );
      return {
        type: item.type,
        count: found ? found.count : 0,
        color: item.color
      };
    });

    return {
      labels: merged.map((m) => m.type),
      datasets: [
        {
          data: merged.map((m) => m.count),
          backgroundColor: merged.map((m) => m.color),
          borderWidth: 0
        }
      ]
    };
  };
  const pieData = getPieData();

  // Custom legend data for pie chart
  const legendData = (() => {
    const defaultTypes = [
      { type: "General Checkup", color: "#5ea1c2" },
      { type: "Follow Up", color: "#e28361" },
      { type: "Consultation", color: "#d75795" },
      { type: "Emergency", color: "#5d7dd8" }
    ];

    const bookingTypes = data.bookingTypes || [];

    const merged = defaultTypes.map((item) => {
      const found = bookingTypes.find(
        (bt) => bt.type?.toLowerCase() === item.type.toLowerCase()
      );
      return {
        type: item.type,
        count: found ? found.count : 0,
        color: item.color
      };
    });

    const total = merged.reduce((sum, m) => sum + m.count, 0) || 1;

    return merged.map((m) => ({
      type: m.type,
      value: `${Math.round((m.count / total) * 100)}%`,
      color: m.color
    }));
  })();

  const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  cutout: "70%",
  radius: "85%",  
  layout: {
    padding: 20   
  },
  animation: {
    animateRotate: true,
    duration: 800
  }
};

  // Bar Chart Data
  const getBarData = () => {
    const monthlyPatients = data.monthlyPatients || [];
    const labels = ["January", "February", "March", "April", "May", "June"];
    const dataArray = [0, 0, 0, 0, 0, 0];
    
    monthlyPatients.forEach(mp => {
      if (mp.month >= 1 && mp.month <= 6) {
        dataArray[mp.month - 1] = mp.count;
      }
    });

    return {
      labels,
      datasets: [{
        data: dataArray,
        backgroundColor: "#6080DBF2",
        borderRadius: 5,
        barThickness: 40
      }]
    };
  };

  const barData = getBarData();

  // Bar Options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        beginAtZero: true, 
        max: (() => {
          const maxData = Math.max(0, ...barData.datasets[0].data);
          return Math.max(200, maxData) + 20;
        })(),
        ticks: { stepSize: 50 } 
      },
      x: { grid: { display: false } }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard">
        <div className="body">
          {/* SIDEBAR */}
          <DoctorSidebar />

          {/* MAIN */}
          <div className="main">
            <div className="cards-dashboard">
              <div className="card-dashboard">
                <div className="icon-box"><img src={peopleIcon} alt="people" /></div>
                <div><h2>{data.totalPatients}</h2><p>Total Patients</p></div>
              </div>
              <div className="card-dashboard">
                <div className="icon-box"><img src={noteIcon} alt="note" /></div>
                <div><h2>{data.todayBookings}</h2><p>Today's Bookings</p></div>
              </div>
              <div className="card-dashboard">
                <div className="icon-box"><img src={clockIcon} alt="clock" /></div>
                <div><h2>{data.waitingCount}</h2><p>Pending Patients</p></div>
              </div>
              <div className="card-dashboard">
                <div className="icon-box"><img src={rateIcon} alt="rate" /></div>
                <div><h2>{data.rating}{typeof data.rating === 'number' && data.rating < 100 ? '%' : ''}</h2><p>Satisfaction Rate</p></div>
              </div>
            </div>

            {/* WEEKLY CHART */}
            <div className="chart-box">
              <h3>Weekly Reservations</h3>
              <div style={{ height: '280px', position: 'relative' }}>
                <Line data={weeklyData} options={weeklyOptions} />
              </div>
            </div>

            {/* TWO CHARTS */}
            <div className="charts">
              <div className="chart-box">
                <h3>Types of Appointments</h3>
                <div style={{ width: "320px", height: "320px", margin: "auto" }}>
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="custom-legend">
                  {legendData.map((item, index) => (
                    <div key={index}>
                      <span
                        className="dot"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="label">{item.type}</span>
                      <span className="value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-box">
                <h3>Monthly Patients</h3>
                <div className="chart-container">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default DoctorDashboard;
// import React, { useState, useEffect } from "react";
// import { Line, Pie, Bar } from "react-chartjs-2";
// import { Container, Row, Col } from "react-bootstrap";
// import footerLogo from "../assets/images/footerlogo.png";
// import { NavLink } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// import clockIcon from "../assets/images/Clock.png";
// import noteIcon from "../assets/images/note-icon.png";
// import peopleIcon from "../assets/images/people-icon.png";
// import rateIcon from "../assets/images/rate.png";
// import axios from "axios";
// import {
//   FaUserMd,
//   FaBell,
//   FaChartLine,
//   FaCalendarCheck,
//   FaGlobe,
//   FaSignOutAlt
// } from "react-icons/fa";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Tooltip,
//   Legend
// );

// const DoctorDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Login and fetch dashboard data
//   useEffect(() => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");

//   if (!token) {
//     setLoading(false);
//     return;
//   }

//   axios
//     .get(
//       "https://graduationproject-production-07f0.up.railway.app/api/DoctorProfile/doctor/dashboard",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((res) => {
//       setDashboardData(res.data);
//     })
//     .catch((err) => {
//       console.log("ERROR:", err);
//       setError("Failed to fetch dashboard");
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, []);

//   // Fallback static data (same as before)
//   const fallbackData = {
//     totalPatients: 1248,
//     todayBookings: 18,
//     waitingCount: 4,
//     rating: 94,
//     bookingTypes: [
//       { type: "General Check-up", count: 45 },
//       { type: "Follow-up", count: 30 },
//       { type: "Consultation", count: 10 },
//       { type: "Emergency", count: 15 }
//     ],
//     weeklyBookings: [
//       { day: "Sat", count: 5 },
//       { day: "Sun", count: 15 },
//       { day: "Mon", count: 12 },
//       { day: "Tue", count: 21 },
//       { day: "Wed", count: 14 },
//       { day: "Thu", count: 16 },
//       { day: "Fri", count: 0 }
//     ],
//     monthlyPatients: [
//       { month: "January", count: 140 },
//       { month: "February", count: 190 },
//       { month: "March", count: 80 },
//       { month: "April", count: 15 },
//       { month: "May", count: 55 },
//       { month: "June", count: 150 }
//     ]
//   };

//   const dataToUse = dashboardData || fallbackData;

//   // Transform API data to match chart requirements
//   const weeklyData = {
//     labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
//     datasets: [
//       {
//         data: dataToUse.weeklyBookings?.map(w => {
//           const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(w.day);
//           return dayIndex !== -1 ? w.count : 0;
//         }) || [5, 15, 12, 21, 14, 16, 0],
//         borderColor: "#8ecae6",
//         fill: true,
//         tension: 0.5,
//         borderWidth: 2,
//         pointRadius: 0,
//         backgroundColor: (context) => {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;
//           if (!chartArea) return null;
//           const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//           gradient.addColorStop(0, "rgba(142,202,230,0.6)");
//           gradient.addColorStop(1, "rgba(142,202,230,0)");
//           return gradient;
//         }
//       }
//     ]
//   };

//   const weeklyOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: { display: true, color: "rgba(0,0,0,0.05)" },
//         ticks: { color: "#000", font: { size: 13 } }
//       },
//       y: {
//         min: 0,
//         max: Math.max(...(dataToUse.weeklyBookings?.map(w => w.count) || [28]), 28),
//         ticks: { stepSize: 1, color: "#000" },
//         grid: { display: true, color: "rgba(0,0,0,0.05)" }
//       }
//     },
//     plugins: { legend: { display: false } }
//   };

//   // Pie Chart Data from API
//   const pieData = {
//     labels: dataToUse.bookingTypes?.map(bt => bt.type) || ["General Check-up", "Follow-up", "Consultation", "Emergency"],
//     datasets: [{
//       data: dataToUse.bookingTypes?.map(bt => bt.count) || [45, 30, 10, 15],
//       backgroundColor: ["#5ea1c2", "#e28361", "#d75795", "#5d7dd8"],
//       borderWidth: 0
//     }]
//   };

//   const pieOptions = { 
//     plugins: { legend: { display: false } },
//     radius: "70%" 
//   };

//   // Bar Chart Data from API
//   const barData = {
//     labels: dataToUse.monthlyPatients?.map(mp => `Month ${mp.month}`) || ["January", "February", "March", "April", "May", "June"],
//     datasets: [{
//       data: dataToUse.monthlyPatients?.map(mp => mp.count) || [140, 190, 80, 15, 55, 150],
//       backgroundColor: "#6080DBF2",
//       borderRadius: 5,
//       barThickness: 40
//     }]
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: {
//       y: { 
//         beginAtZero: true, 
//         max: Math.max(...(dataToUse.monthlyPatients?.map(mp => mp.count) || [200]), 200),
//         ticks: { stepSize: 50 } 
//       },
//       x: { grid: { display: false } }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="dashboard">
//         <div className="body">
//           <div className="sidebar-card text-center">Loading...</div>
//           <div className="main">
//             <div style={{ padding: '20px', textAlign: 'center' }}>
//               Loading dashboard data...
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="dashboard">
//         <div className="body">
//           <div className="sidebar-card text-center">Error</div>
//           <div className="main">
//             <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
//               Error loading data: {error}. Using fallback data.
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="dashboard">
//         <div className="body">
//           {/* SIDEBAR */}
//           <div className="sidebar-card text-center">
//             <div className="profile-img-container">
//               <div className="profile-img-wrapper">
//                 <img
//                   src="https://randomuser.me/api/portraits/men/32.jpg"
//                   alt="doctor"
//                   className="profile-img"
//                 />
//               </div>
//               <label className="upload-icon">
//                 <i className="fa-regular fa-camera"></i>
//                 <input type="file" hidden />
//               </label>
//             </div>
//             <h5 className="mt-3 fw-bold">Ali L.</h5>
//             <p className="profile-id">Patient ID : #HE-92301</p>

//             <div className="menu">
//               <NavLink to="/profile" className="menu-item">
//                 <div className="icon-wrapper">
//                   <FaUserMd className="menu-icon" />
//                 </div>
//                 <span>Personal Information</span>
//               </NavLink>

//               <div className="menu-item">
//                 <div className="icon-wrapper">
//                   <FaBell className="menu-icon" />
//                 </div>
//                 <span>Notification Settings</span>
//               </div>

//               <NavLink to="/dashboard" className="menu-item">
//                 <div className="icon-wrapper">
//                   <FaChartLine className="menu-icon" />
//                 </div>
//                 <span>Dashboard</span>
//               </NavLink>

//               <div className="menu-item">
//                 <div className="icon-wrapper">
//                   <FaCalendarCheck className="menu-icon" />
//                 </div>
//                 <span>Bookings</span>
//               </div>

//               <div className="menu-item">
//                 <div className="icon-wrapper">
//                   <FaGlobe className="menu-icon" />
//                 </div>
//                 <span>Language</span>
//               </div>

//               <div className="menu-item logout">
//                 <div className="icon-wrapper">
//                   <FaSignOutAlt className="menu-icon" />
//                 </div>
//                 <span>Log out</span>
//               </div>
//             </div>
//           </div>

//           {/* MAIN */}
//           <div className="main">
//             <div className="cards-dashboard">
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={peopleIcon} alt="people" /></div>
//                 <div><h2>{dataToUse.totalPatients}</h2><p>Total Patients</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={noteIcon} alt="note" /></div>
//                 <div><h2>{dataToUse.todayBookings}</h2><p>Today's Bookings</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={clockIcon} alt="clock" /></div>
//                 <div><h2>{dataToUse.waitingCount}</h2><p>Pending Patients</p></div>
//               </div>
//               <div className="card-dashboard">
//                 <div className="icon-box"><img src={rateIcon} alt="rate" /></div>
//                 <div><h2>{dataToUse.rating}%</h2><p>Satisfaction Rate</p></div>
//               </div>
//             </div>

//             {/* WEEKLY CHART */}
//             <div className="chart-box">
//               <h3>Weekly Reservations</h3>
//               <div style={{ height: '250px' }}>
//                 <Line data={weeklyData} options={weeklyOptions} />
//               </div>
//             </div>

//             {/* TWO CHARTS */}
//             <div className="charts">
//               <div className="chart-box">
//                 <h3>Types of Appointments</h3>
//                 <Pie data={pieData} options={pieOptions} />
//                 <div className="custom-legend">
//                   {dataToUse.bookingTypes?.map((booking, index) => (
//                     <div key={index}>
//                       <span className={`dot ${['blue', 'orange', 'pink', 'darkblue'][index % 4]}`}></span>
//                       <span className="label">{booking.type}</span>
//                       <span className="value">{booking.count}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="chart-box">
//                 <h3>Monthly Patients</h3>
//                 <div className="chart-container">
//                   <Bar data={barData} options={barOptions} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="footer mt-5">
//         <Container>
//           <Row className="gy-4">
//             <Col md={4}>
//               <h5 className="footer-logo">
//                 <img src={footerLogo} alt="Healthcare Team" className="img-fluid" />
//               </h5>
//               <p className="footer-text">
//                 Your trusted partner for healthcare solutions and medical equipment.
//               </p>
//             </Col>

//             <Col md={2}>
//               <h6 className="footer-title">Quick Links</h6>
//               <ul className="footer-links">
//                 <li>Find Hospitals</li>
//                 <li>Rent Equipment</li>
//                 <li>AI Assistant</li>
//               </ul>
//             </Col>

//             <Col md={3}>
//               <h6 className="footer-title">Support</h6>
//               <ul className="footer-links">
//                 <li>Help Center</li>
//                 <li>Contact Us</li>
//                 <li>Privacy Policy</li>
//               </ul>
//             </Col>

//             <Col md={3}>
//               <h6 className="footer-title">Contact</h6>
//               <p className="footer-text mb-1">Email: support@MedRent.com</p>
//               <p className="footer-text mb-1">Phone: 1-800-HEALTH</p>
//               <p className="footer-text">Address: 123 Medical St, City</p>
//             </Col>
//           </Row>

//           <hr className="footer-line" />
//           <p className="footer-copy text-center">© 2025 MedRent. All rights reserved.</p>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default DoctorDashboard;