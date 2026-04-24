

import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MyRentals from "./pages/MyRentals.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import RentEquipment from "./pages/RentEquipment.jsx";
import OTPForm from "./pages/Otp.jsx";
import RentalDetails from "./pages/RentalDetails.jsx";
// import Rent from "./pages/rent.jsx";

import HospitalDetails from "./pages/HospitalDetails";
import BookingPage from "./pages/BookingPage.jsx";
import HospitalSearch from "./pages/HospitalSearch.jsx";
import NewPassword from "./pages/NewPassword.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import VerificationCode from "./pages/VerificationCode.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AiAssistant from "./pages/AiAssistant";
import Profile from "./pages/Profile";

import ConfirmRental from "./pages/ConfirmRental.jsx";
import Notifications from "./pages/Notifications.jsx";
import DoctorPayment from "./pages/DoctorPayment.jsx";

import DoctorDashboard from "./pages/DoctorDashboard";
import EquipmentownerBookings from "./pages/EquipmentownerBookings";
import EquipmentownerDashboard from "./pages/EquipmentownerDashboard";
import EquipmentownerDevices from "./pages/EquipmentownerDevices";
import EquipmentownerAddDevice from "./pages/EquipmentownerAddDevice";
import DoctorBookings from "./pages/DoctorBookings";
function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "rentals", element: <MyRentals /> },
        { path: "contact", element: <ContactUs /> },
        { path: "login", element: <Login /> },
        { path: "signUp", element: <SignUp /> },
        { path: "signUp/otp", element: <OTPForm/> },
        { path: "rentEquipment", element: <RentEquipment /> },
        { path: "hospitalSearch", element: <HospitalSearch /> },
        { path: "rentals/:id", element: <RentalDetails/> },
        { path: "rent/:id", element: <ConfirmRental/> },
        { path: "otp", element: <OTPForm/> },

        {path:"hospital/:id", element:<HospitalDetails />},
        { path: "hospital/:id/booking", element: <BookingPage /> },
        { path: "new-password", element: <NewPassword/> },
        { path: "forget-password", element: <ForgetPassword/> },
        { path: "forget-password/veification-code", element: <VerificationCode/> },
        { path: "forget-password/veification-code/reset-password", element: <ResetPassword/> },
        { path: "ai-assistant", element: <AiAssistant /> },
        {path: "profile",  element: <Profile /> },

        {path: "notifications",  element: <Notifications/> },
        {path: "/doctor-payment/:bookingId",  element: <DoctorPayment/> },

        { path: "dashboard", element: <DoctorDashboard /> },
        { path: "equipmentowner-bookings", element: <EquipmentownerBookings /> },
        { path: "equipmentowner-dashboard", element: <EquipmentownerDashboard /> },
        { path: "equipmentowner-devices", element: <EquipmentownerDevices /> },
        { path: "equipmentowner-add-device", element: <EquipmentownerAddDevice /> },
        { path: "doctor-bookings", element: <DoctorBookings /> },

        
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
