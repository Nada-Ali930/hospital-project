

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.jsx";
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
import Rent from "./pages/rent.jsx";
import HospitalSearch from "./pages/HospitalSearch.jsx";
import NewPassword from "./pages/NewPassword.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import VerificationCode from "./pages/VerificationCode.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

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
        { path: "rent/:id", element: <Rent/> },
        { path: "otp", element: <OTPForm/> },
        { path: "new-password", element: <NewPassword/> },
        { path: "forget-password", element: <ForgetPassword/> },
        { path: "forget-password/veification-code", element: <VerificationCode/> },
        { path: "forget-password/veification-code/reset-password", element: <ResetPassword/> },
        
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
