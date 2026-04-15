import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import paymentImg from "../assets/images/payment.png";
const stripePromise = loadStripe(
  "pk_test_51SVpZCJ89TkRuiBxju6u62Gw2JtfGwZKPuWIj8KLFl9WcOhA2rhUaIUG5zEpctXtGLDs75vzngpV14caAAdb0P9w00MU5PUBMX",
);

const baseURL = "http://graduationprojectapi.somee.com";

/* ================= PAYMENT FORM ================= */
function PaymentForm({ summary, bookingId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handlePay = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseURL}/api/BookingPayment/create-intent/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const clientSecret = res.data.clientSecret;
      const paymentIntentId = res.data.paymentIntentId;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.name,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        setLoading(false);
        return;
      }

      await axios.post(
        `${baseURL}/api/BookingPayment/verify`,
        {
          paymentIntentId,
          patientName: form.name,
          patientEmail: form.email,
          patientPhone: form.phone,
          bookingType: "Normal",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Payment succeeded 🎉");
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="payment-container">
      {/* LEFT SIDE */}
      <div className="left">
        <h5>Patient Information</h5>

        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email Address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Contact Number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <h5 className="mt-4">Payment Details</h5>

        <div className="card-box">
          <CardElement />
        </div>

        <button onClick={handlePay} disabled={loading} className="payment-btn">
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <span className="secure secure-pay">Secure Payment</span>
        <img src={paymentImg} alt="Payment" className="payment-img w-100" />
        <h5 className="fw-bolder fa-5 pb-3">Appointment Summary</h5>
        <div className="doc">
          <div>
            <h6>{summary?.doctorName}</h6>
            <small>{summary?.departmentName}</small>
          </div>
        </div>

        <div className="info">
          <p><span>Date:</span> {new Date(summary?.date).toDateString()}</p>
          <p><span>Time:</span> {summary?.time}</p>
          <p><span>Fee:</span> {summary?.price} LE</p>
        </div>
          <hr/>
        <h4>Total:<span>{summary?.price} LE</span></h4>
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
function DoctorPayment() {
  const location = useLocation();

  const { doctorId, date, time } = location.state || {};

  const [bookingId, setBookingId] = useState(null);
  const [summary, setSummary] = useState(null);

  const created = useRef(false);

  /* ================= CREATE BOOKING ================= */
  const createBooking = async () => {
    try {
      if (!doctorId || !date || !time) {
        console.log("Missing data:", { doctorId, date, time });
        return;
      }

      const formattedDate = new Date(date).toISOString().split("T")[0];

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseURL}/api/Booking`,
        {
          doctorId,
          date: formattedDate,
          time,
          notes: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(localStorage.getItem("token"));

      const id = res.data.bookingId;
      setBookingId(id);

      getSummary(id);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= GET SUMMARY ================= */
  const token = localStorage.getItem("token");

  const getSummary = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/api/Booking/${id}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  /* ================= RUN ONCE ================= */
  useEffect(() => {
    if (!created.current) {
      created.current = true;
      createBooking();
    }
  }, []);

  /* ================= LOADING ================= */
  if (!summary) return <h3>Loading...</h3>;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm summary={summary} bookingId={bookingId} />
    </Elements>
  );
}

export default DoctorPayment;
