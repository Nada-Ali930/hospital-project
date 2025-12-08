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

function App() {
  let routes=createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'/about',element:<About/>},
      {path:'/rentals',element:<MyRentals/>},
      {path:'/contact',element:<ContactUs/>},
      {path:'/login',element:<Login/>},
      {path:'/signUp',element:<SignUp/>},
    ]}
  ])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;