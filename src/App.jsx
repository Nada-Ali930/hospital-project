

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
        { path: "rentals/:id", element: <RentalDetails/> },
        { path: "rent/:id", element: <Rent/> },
        { path: "otp", element: <OTPForm/> }
        
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
