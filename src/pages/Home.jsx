import React from "react";
import bg from "../assets/images/bg.jpg";
import medicalEquip from '../assets/images/medicalEquip.jpg'
import process1 from '../assets/images/process1.jpg'
import process2 from '../assets/images/process2.jpg'
import process3 from '../assets/images/process3.jpg'
import Footer from '../components/Footer.jsx'
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="home-page">
      {/* ---------------- Header SECTION ---------------- */}
      <section>
      <div
        className="text-white text-center d-flex align-items-center header"
        style={{
          background: `
      linear-gradient(
        90deg,
        rgba(3,27,78,.6) 0%,
        rgba(3,27,78,.5) 42%,
        rgba(3,27,78,0.4) 58%,
        rgba(0,177,211,0.4) 62%,
        rgba(0,177,211,.5) 78%,
        rgba(0,177,211,.6) 100%
      ),
      url(${bg})
    `,
          backgroundRepeat:"no-repeat",
          backgroundSize:'cover',
          backgroundPosition: "top",
          height: "68vh",
          padding: "120px 0",
        }}
      >
        <div className="container">
          <h1>Your Health, Our Priority</h1>
          <p className="mt-3 fs-4">
            Find the best hospitals, rent medical equipment, and get
            <br />
            AI-powered health guidance
          </p>
        </div>
      </div>
              {/* 3 cards */}
<div className="header-cards">
  <div className="container">
    <div className="row g-4 justify-content-center">

      <div className="col-10 col-md-4 card1">
        <div className="bg-white text-dark p-4 rounded shadow">
          <div className="d-flex align-items-center mb-2">
            <div className="box1 me-2">
              <i className="fas fa-search"></i>
            </div>
            <h6 className="fw-bold fs-5">Hospital Search</h6>
          </div>
          <p>
            Find hospitals by capacity, location, <br />and rating.
          </p>

          <Link to="/hospitalSearch" className="btn w-100 home-button-1">
            Search Now
          </Link>

        </div>
      </div>

      <div className="col-10 col-md-4 card2">
        <div className="bg-white text-dark p-4 rounded shadow">
          <div className="d-flex align-items-center mb-2">
            <div className="box2 me-2">
              <i className="fas fa-cube"></i>
            </div>
            <h6 className="fw-bold fs-5">Equipment Rental</h6>
          </div>
          <p>
            Browse and rent medical devices and <br />equipment.
          </p>

          <Link to="/rentEquipment" className="btn w-100 home-button-2">
            Browse Equipment
          </Link>

        </div>
      </div>

      <div className="col-10 col-md-4 card3">
        <div className="bg-white text-dark p-4 rounded shadow">
          <div className="d-flex align-items-center mb-2">
            <div className="box3 me-2">
              <i className="far fa-comment-dots"></i>
            </div>
            <h6 className="fw-bold fs-5">AI Assistant</h6>
          </div>
          <p>
            Get personalized health <br />recommendations from our AI
          </p>

          <Link to="/ai-chat" className="btn w-100 home-button-3">
            Start Chat
          </Link>

        </div>
      </div>

    </div>
  </div>
</div>

      
      </section>
      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="text-center whyChoose py-5">
        <div className="container">
          <h3 className="fs-3 fw-semibold">
            Why Choose Med<span>Rent</span>?
          </h3>
          <p className="mt-2 lead prag ">
            We provide comprehensive healthcare solutions to help
            <br />
            you make informed decisions
          </p>

          <div className="row mt-4 g-4 justify-content-center">
            <div className="col-md-4">
              <div className="p-3">
                <div className="icon1"><i className="fas fa-map-pin"></i></div>
                <h6 className="">Location-based Search</h6>
                <p className="small">Find hospitals and equipment near you with precise location tracking</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3">
               <div className="icon2"><i className="far fa-star"></i></div> 
                <h6 className="">Verified Ratings</h6>
                <p className="small">Read reviews from patients to help you choose the best care</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3">
                <div className="icon3"><i className="far fa-clock"></i></div>
                <h6 className="">Availability</h6>
                <p className="small">
                  Book appointments and rent equipment anytime,anyWhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MEDICAL EQUIPMENT RENTAL ---------------- */}
      <section className="py-5">
        <div className="container d-flex flex-column flex-md-row align-items-center gap-4 equipment-rental">
          <div className="flex-fill">
            <h3 className="fs-3 fw-semibold">Medical Equipment Rental Made Easy</h3>
            <p>Access a wide range of medical devices for home care.<br/>
              From wheelchairs to monitoring equipment,we have <br/>everything you need.
            </p>
            <ul className="custom-list">
              <li>Flexible rental periods</li>
              <li>Sanitized and certified equipment</li>
              <li>Home delivery available</li>
            </ul>
            <button className="btn px-4 mt-3"><i className=" fas fa-cube pe-3 "></i> Explore Equipment</button>
          </div>

          <img
            className="rounded"
            src={medicalEquip}
            alt="medicalEquip"
            style={{ width: "480px" }}
          />
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
<section className="process pt-5">
  <div className="container">
    <h4 className="mb-4 text-center">How does our process work?</h4>
    <div className="row g-5 process-row ">
      <div className="col-md-4">
        <div className="process-card">
          <h4>.01<sup>Step</sup></h4>
          <img src={process1} alt="" className="process-img " />
          <h6 className="fw-bold mt-3">Book an appointment</h6>
          <p className="small">Book an appointment online, by phone, or visit us in person</p>
        </div>
      </div>

      <div className="col-md-4 middle">
        <div className="process-card ">
          <h4>.02<sup>Step</sup></h4>
          <img src={process2} alt="" className="process-img " />
          <h6 className="fw-bold mt-3">Get Evaluated</h6>
          <p className="small">Consult with our healthcare experts for a diagnosis</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="process-card">
          <h4>.03<sup>Step</sup></h4>
          <img src={process3} alt="" className="process-img last-img " />
          <h6 className="fw-bold mt-3">Receive Care</h6>
          <p className="small">Book an appointment online, by phone, or visit us in person</p>
        </div>
      </div>
    </div>
  </div>
</section>


      <Footer/>
    </div>
    
  );
}
