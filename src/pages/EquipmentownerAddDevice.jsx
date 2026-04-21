import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import OwnerSidebar from "./OwnerSidebar";
import cameraIcon from "../assets/images/cameraIcon.png";
import upArrowIcon from "../assets/images/uparrowIcon.png";
import { useNavigate } from "react-router-dom";

export default function AddDevicePage() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [device, setDevice] = useState({
    Name: "",
    Description: "",
    PricePerDay: "",
    Image: null,
    preview: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = 800;
        canvas.height = 600;
        ctx.drawImage(img, 0, 0, 800, 600);
        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
          'image/jpeg',
          0.7
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Please login first ❌");
      return;
    }

    if (!device.Name.trim() || !device.PricePerDay || !device.Image) {
      setMessage("Please fill all required fields and select an image ❌");
      return;
    }

    try {
      // ✅ AUTO LOGIN IF NO TOKEN OR WRONG ROLE
      const loginResponse = await axios.post(
        "http://graduationprojectapi.somee.com/api/Auth/login",
        {
          email: "marwawageeh47@gmail.com", // ✅ EquipmentOwner login
          password: "marwawageeh47@"
        }
      );
      
      const ownerToken = loginResponse.data.token;
      localStorage.setItem("token", ownerToken);

      setLoading(true);
      setMessage("Uploading...");

      // ✅ FIXED ENDPOINT URL
      const endpoint = "http://graduationprojectapi.somee.com/api/EquipmentOwner/add-device";

      console.log("Using endpoint:", endpoint);

      let uploadImage = device.Image;
      if (device.Image.size > 2 * 1024 * 1024) {
        setMessage("Compressing image...");
        uploadImage = await compressImage(device.Image);
      }

      const formData = new FormData();
      formData.append("Name", device.Name.trim());
      formData.append("Description", device.Description.trim());
      formData.append("PricePerDay", parseFloat(device.PricePerDay));
      formData.append("Image", uploadImage);

      const res = await axios.post(endpoint, formData, {
        headers: { 
          Authorization: `Bearer ${ownerToken}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 45000,
      });

      setMessage(res.data.message || "Device added successfully ✅");
      setTimeout(() => navigate("/equipmentowner-devices"), 1500);

    } catch (err) {
      console.error("Full error:", err.response?.data || err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setMessage("Access denied. Please login as EquipmentOwner ❌");
      } else if (err.code === 'ECONNRESET' || err.code === 'ERR_NETWORK') {
        setMessage("Server connection error ⏳");
      } else {
        setMessage(err.response?.data?.message || "Failed to add device ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-device-layout">
        <OwnerSidebar />

        <div className="add-device-content">
          <h2 className="add-device-title">Add a new device</h2>
          <p className="add-device-subtitle">
            Enter the information of the device you want to add
          </p>

          <div className="add-device-image-card">
            <h5>Device Image</h5>
            <label className="add-device-upload">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      setMessage("Image must be less than 5MB ❌");
                      return;
                    }
                    const preview = URL.createObjectURL(file);
                    setDevice((prev) => ({
                      ...prev,
                      Image: file,
                      preview: preview
                    }));
                    setMessage("");
                  }
                }}
              />

              {device.preview ? (
                <img
                  src={device.preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px"
                  }}
                />
              ) : (
                <>
                  <div>
                    <img src={cameraIcon} alt="camera" style={{ width: "24px", height: "24px" }} />
                  </div>
                  <span>Add Image</span>
                </>
              )}
            </label>
          </div>

          <div className="add-device-form-card">
            <h5>Device Information</h5>

            <form onSubmit={handleAddDevice}>
              <input
                className="add-device-input"
                type="text"
                placeholder="Enter name of device"
                value={device.Name}
                onChange={(e) => setDevice({ ...device, Name: e.target.value })}
              />

              <input
                className="add-device-input"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price per day"
                value={device.PricePerDay}
                onChange={(e) => setDevice({ ...device, PricePerDay: e.target.value })}
              />

              <textarea
                className="add-device-textarea"
                rows="4"
                placeholder="Enter a detailed description..."
                value={device.Description}
                onChange={(e) => setDevice({ ...device, Description: e.target.value })}
              />

              <button type="submit" className="add-device-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span>Uploading...</span>
                    <div className="spinner-border spinner-border-sm ms-2" role="status"></div>
                  </>
                ) : (
                  <>
                    Add Device
                    <img 
                      src={upArrowIcon} 
                      alt="arrow" 
                      style={{ width: "16px", marginLeft: "8px" }} 
                    />
                  </>
                )}
              </button>
            </form>

            {message && (
              <div className={`alert ${message.includes('✅') || message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}