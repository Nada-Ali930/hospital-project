import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  const api = "http://GraduationProject.somee.com/api";

  // const getNotifications = async () => {
  //   try {
  //     const res = await axios.get(`${api}/Notification/my`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setNotifications(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const getNotifications = async () => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const res = await axios.get(`${api}/Notification/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications(res.data);
  } catch (err) {
    console.log(err);
  }
};

  // useEffect(() => {
  //   getNotifications();
  // }, []);

  useEffect(() => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    getNotifications();
  }
}, []);

  return (
    <div className="notifications-page">
      <Container className="pt-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Notifications</h4>
          <span className="mark-read">Mark all as read</span>
        </div>

        {/* List */}
        {notifications.map((item) => (
          <Card key={item.notificationId} className="notification-card mb-3">
            <div className="d-flex align-items-center">

              <div className="icon">📅</div>

              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="mb-1 text-muted">{item.message}</p>
                <small className="text-muted">
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>

              {!item.isRead && <span className="dot"></span>}
            </div>
          </Card>
        ))}

        {/* Footer */}
        <Link to ='/' className="text-decoration-none">
           <div className="text-center mt-4 back-home">
             ← Back to home
           </div>
        </Link>
      </Container>
    </div>
  );
}