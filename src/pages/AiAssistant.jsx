import { useState } from "react";
import axios from "axios";
import aiIcon from "../assets/images/ai-icon.png";
import aiIcon2 from "../assets/images/ai-icon2.png";

export default function AiAssistant() {

  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

//   
const analyzeSymptoms = async () => {

  const fakeData = {
    department: "Cardiology",
    suggestedActions: [
      "Seek medical attention within 24 hours.",
      "Monitor any changes in your breathing.",
      "Avoid heavy physical activity."
    ],
    howToUse:
      "Describe symptoms in everyday language. Include duration, severity, or other notes.",
    hospitals: [
      {
        hospitalId: 1,
        name: "City Medical Center",
        distanceKm: 2.5,
        rating: 4.8
      },
      {
        hospitalId: 2,
        name: "St. Mary's Hospital",
        distanceKm: 2.5,
        rating: 4.6
      }
    ]
  };

  setData(fakeData);
};

  return (
    <div className="container py-5">

      {/* title */}
      <h3 className="text-center fw-bold mb-3 Ai-title">
        AI Medical Assistant
      </h3>

      <p className="text-center Ai-text mb-4">
        Describe your symptoms and let our smart assistant guide you to the right department
      </p>

      {/* textarea */}
      <div className="mb-3">
        <label className="fw-semibold mb-2 Ai-t-desc">
          Describe Your Symptoms
        </label>

        <textarea
          className="Ai-box form-control"
          rows="4"
          placeholder="e.g., I have a sharp headache and feel dizzy ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      {/* button */}
      <button
        className="btn btn-Ai w-100 mb-4"
        onClick={analyzeSymptoms}
      >
        {loading ? "Analyzing..." : "Analyze Symptoms"}
      </button>

      <p className="secure-text text-center mt-2">
        Your input is processed securely.
      </p>

      {/* RESULT */}
      {data && (

        <>
          <div className="row mt-4 g-3">

            {/* Department */}
            <div className="col-md-4">

              <div className="info-card">

                <h6 className="d-flex align-items-center gap-2">
  <img src={aiIcon} alt="" className="ai-icon"/>
  {data.department}
</h6>

                <p>
                  Based on your symptoms, this department is the most relevant for a consultation.
                </p>

              </div>

            </div>

            {/* Suggested Actions */}
            <div className="col-md-4">

              <div className="info-card">

                <h6 className="d-flex align-items-center gap-2">
  <img src={aiIcon} alt="" className="ai-icon"/>
  Suggested Actions
</h6>

                {data.suggestedActions.map((action, index) => (
                  <p key={index} className="d-flex align-items-start gap-2">
  <img src={aiIcon2} alt="" className="ai-icon2"/>
  {action}
</p>
                ))}

              </div>

            </div>

            {/* How To Use */}
            <div className="col-md-4">

              <div className="info-card">

                <h6 className="d-flex align-items-center gap-2">
  <img src={aiIcon} alt="" className="ai-icon"/>
  How to Use
</h6>

                <p>
                  {data.howToUse}
                </p>

              </div>

            </div>

          </div>

          {/* Hospitals */}
<div className="hospital-section mt-4">
  <h6 className="mb-3 d-flex align-items-center gap-2">
    <img src={aiIcon} alt="" className="ai-icon"/>
    Nearby Hospitals
  </h6>

  {data.hospitals.map((hospital) => (
    <div
      key={hospital.hospitalId}
      className="hospital-card p-3 d-flex flex-column align-items-start gap-2"
    >

      {/* Name */}
      <h6 className="hospital-name mb-1">{hospital.name}</h6>

      {/* Distance & Rating */}
      <small className="hospital-meta">
        {hospital.distanceKm} miles away |{" "}
        {hospital.rating}
        <i className="fa-solid fa-star ms-2" style={{ color: "#FFC107" }}></i>{" "}
        
      </small>

      <button className="view-btn mt-2">
        View Details
      </button>

    </div>
  ))}
</div>

        </>
      )}

      <p className="disclaimer text-center mt-4">
        This tool provides general guidance and does not replace professional medical diagnosis.
      </p>

    </div>
  );
}