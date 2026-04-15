import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SVpZCJ89TkRuiBxju6u62Gw2JtfGwZKPuWIj8KLFl9WcOhA2rhUaIUG5zEpctXtGLDs75vzngpV14caAAdb0P9w00MU5PUBMX");

function PaymentForm({ summary, rentalId, baseURL, token }) {

  const stripe = useStripe();
  const elements = useElements();

  const [loadingPay, setLoadingPay] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: ""
  });

  const handleConfirm = async () => {

    if (!rentalId) return;

    try {

      setLoadingPay(true);

      // 1️⃣ start checkout
      const res = await axios.post(
        `${baseURL}/api/Payment/start-checkout`,
        {
          rentalId,
          ...form
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const clientSecret = res.data.clientSecret;
      const paymentIntentId = res.data.paymentIntentId;

      // 2️⃣ stripe payment
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: form.fullName
          }
        }
      });

      if (result.error) {
        alert(result.error.message);
        setLoadingPay(false);
        return;
      }

      // 3️⃣ verify
      await axios.post(
        `${baseURL}/api/Payment/verify/${paymentIntentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Payment succeeded 🎉");

    } catch (e) {

      console.log(e.response?.data);
      alert("Payment failed");

    }

    setLoadingPay(false);

  };

  return (

    <div className="confirm-content">

      {/* LEFT */}
      <div className="form-section">

        <h5 className="section-title">1. Payment Method</h5>

        <div className="payment-box active">
          <input type="radio" checked readOnly />
          <span>Credit / Debit card</span>
          <div className="cards">
            <img src="/visa.png" alt="" />
            <img src="/mastercard.png" alt="" />
          </div>
        </div>

        <label>Card Details</label>

        <div className="input">
          <CardElement />
        </div>

        <h5 className="section-title">2. Delivery Address</h5>

        <label>Name</label>
        <input
          className="input"
          placeholder="Enter your full name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <label>Phone</label>
        <input
          className="input"
          placeholder="Enter your phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label>Street Address</label>
        <input
          className="input"
          placeholder="Enter your address"
          onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
        />

        <label>Apartment, Suite, etc.(Optional)</label>
        <input
          className="input"
          placeholder="Enter your address"
          onChange={(e) => setForm({ ...form, apartment: e.target.value })}
        />

        <label>City</label>
        <input
          className="input"
          placeholder="Enter your city"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={loadingPay}
        >
          {loadingPay ? "Processing..." : "Confirm Rental"}
        </button>

      </div>

      {/* RIGHT */}
      <div className="summary-section">

        <h5>Rental Summary</h5>

        <img src={`${baseURL}${summary.imageUrl}`} alt="" />
        <h6>{summary.equipmentName}</h6>

        <p>
          Start: {new Date(summary.startDate).toDateString()} <br />
          End: {new Date(summary.endDate).toDateString()}
        </p>

        <div className="price-box">

          <div>
            <span>Rental Fee</span>
            <span>{summary.rentalFee}</span>
          </div>

          <div>
            <span>Insurance Fee</span>
            <span>{summary.insuranceFee}</span>
          </div>

          <div>
            <span>Tax</span>
            <span>{summary.tax}</span>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <span>{summary.totalPrice} LE</span>
          </div>

        </div>

      </div>

    </div>
  );
}

function ConfirmRental() {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const baseURL = "http://graduationproject.somee.com";

  const params = new URLSearchParams(location.search);
  const startDate = params.get("start");
  const endDate = params.get("end");

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  const [summary, setSummary] = useState(null);
  const [rentalId, setRentalId] = useState(null);

  const hasCreatedRent = useRef(false);

  const createRent = async () => {

    try {

      const res = await axios.post(
        `${baseURL}/api/Equipment/rent`,
        {
          equipmentId: Number(id),
          startDate,
          endDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const rentId = res.data.rentalId;

      setRentalId(rentId);

      getSummary(rentId);

    } catch (e) {

      console.log(e.response?.data);
      alert("Failed to create rent");
      navigate(-1);

    }
  };

  const getSummary = async (rentId) => {

    try {

      const res = await axios.get(
        `${baseURL}/api/Payment/${rentId}/summary`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSummary(res.data);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    if (!hasCreatedRent.current) {
      hasCreatedRent.current = true;
      createRent();
    }

  }, []);

  if (!summary) return <p className="loading">Loading...</p>;

  return (

    <div className="confirm-container">

      <div className="confirm-header">
        <h3>Confirm Your Rental</h3>
        <span className="secure">Secure Payment</span>
      </div>

      <Elements stripe={stripePromise}>

        <PaymentForm
          summary={summary}
          rentalId={rentalId}
          baseURL={baseURL}
          token={token}
        />

      </Elements>

    </div>
  );
}

export default ConfirmRental;

