import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import Footer from "./Footer";
import OwnerSidebar from "./OwnerSidebar";

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

const EquipmentownerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        const response = await axios.get(
          "http://graduationprojectapi.somee.com/api/EquipmentOwner/EquipmentOwner/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDashboardData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // fallback
  const defaultData = {
    totalDevices: 2,
    todayRentals: 12,
    pendingRentals: 5,
    rating: 4.5,
    weeklyRentals: [],
    rentalTypes: []
  };

  const data = dashboardData || defaultData;

  // ================= Weekly Chart =================
  const getWeeklyData = () => {
    const weekly = data.weeklyRentals || [];
    const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

 
    if (weekly.length === 0) {
      return {
        labels,
        datasets: [
          {
            data: [5, 15, 10, 20, 14, 16, 2],
            borderColor: "#6FCB2D8C",
            fill: true,
            tension: 0.5,
            backgroundColor: (context) => {
              const { ctx, chartArea } = context.chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(139,195,74,0.5)");
              gradient.addColorStop(1, "rgba(139,195,74,0)");
              return gradient;
            }
          }
        ]
      };
    }

    const counts = new Array(7).fill(0);

    weekly.forEach((item, index) => {
      counts[index] = item.count || 0;
    });

    return {
      labels,
      datasets: [
        {
          data: counts,
          borderColor: "#6FCB2D8C",
          fill: true,
          tension: 0.5
        }
      ]
    };
  };

  const weeklyData = getWeeklyData();

  const weeklyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  // ================= Pie Chart =================
  const getPieData = () => {
  const types = data.rentalTypes || [];

  if (types.length === 0) {
    return {
      labels: ["Daily Rental", "Weekly Rental"],
      datasets: [
        {
          data: [40, 60],
          backgroundColor: ["#5bc080", "#e28361"],
          borderWidth: 0
        }
      ]
    };
  }

  return {
    labels: types.map((t) => t.type),
    datasets: [
      {
        data: types.map((t) => t.count),
        backgroundColor: ["#5bc080", "#E28361"],
        borderWidth: 0
      }
    ]
  };
};
const pieData = getPieData();

  const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  cutout: "70%",
  radius: "90%" 
};

  const legendData =
  data.rentalTypes.length === 0
    ? [
        { type: "Daily Rental", value: "40%", color: "#5bc080" },
        { type: "Weekly Rental", value: "60%", color: "#e28361" }
      ]
    : data.rentalTypes.map((t, i) => {
        const total = data.rentalTypes.reduce(
          (sum, x) => sum + x.count,
          0
        );

        return {
          type: t.type,
          value: Math.round((t.count / total) * 100) + "%",
          color: i === 0 ? "#5bc080" : "#e28361"
        };
      });

  // ================= Bar Chart =================
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [140, 180, 80, 10, 50, 150],
        backgroundColor: "#db60cd",
        borderRadius: 0,
        barThickness: 35
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <>
      <div className="dashboard">
        <div className="body">
          <OwnerSidebar />

          <div className="main">
            {/* Cards */}
            <div className="cards-dashboard">
              <div className="card-dashboard">
                <div className="icon-box">
                  <img src={peopleIcon} alt="" />
                </div>
                <div>
                  <h2>{data.totalDevices}</h2>
                  <p>Total Devices</p>
                </div>
              </div>

              <div className="card-dashboard">
                <div className="icon-box">
                  <img src={noteIcon} alt="" />
                </div>
                <div>
                  <h2>{data.todayRentals}</h2>
                  <p>Today's Rentals</p>
                </div>
              </div>

              <div className="card-dashboard">
                <div className="icon-box">
                  <img src={clockIcon} alt="" />
                </div>
                <div>
                  <h2>{data.pendingRentals}</h2>
                  <p>Pending Rentals</p>
                </div>
              </div>

              <div className="card-dashboard">
                <div className="icon-box">
                  <img src={rateIcon} alt="" />
                </div>
                <div>
                  <h2>{data.rating}</h2>
                  <p>Rating</p>
                </div>
              </div>
            </div>

            {/* Weekly */}
            <div className="chart-box">
              <h3>Weekly Rentals</h3>
              <div style={{ height: 280 }}>
                <Line data={weeklyData} options={weeklyOptions} />
              </div>
            </div>

            {/* Charts */}
            <div className="charts">
              <div className="chart-box">
                <h3>Types of Appointments</h3>
                <div style={{ width: "250px", height: "300px", margin: "auto" }}>
  <Pie data={pieData} options={pieOptions} />
</div>

                <div className="custom-legend">
                  {legendData.map((item, i) => (
                    <div key={i}>
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

      <Footer />
    </>
  );
};

export default EquipmentownerDashboard;