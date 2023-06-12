import './App.css';
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import AllocateRooms from './pages/AllocateRooms';

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",  //base url
    element: <BaseLayout />,
    children: [

      //dashboard url
      {
        path: "/dashboard",   
        element: <Home />,
      },
      
      //user-profile url
      {
        path: "/profile", 
        element: <Profile />,
      },

      //room-allocation url
      {
        path: "/allocateRooms",
        element: <AllocateRooms />
      },
    ]
  },

  //login url
  {
    path: "/login", 
    element: <Login />,
  },

  //forgot-password url
  {
    path: "/fpass",
    element: <ForgotPassword />
  },

  //change-password url
  {
    path: "/passwordReset",
    element: <ResetPassword />
  },

  //register-user url
  {
    path: "/register", 
    element: <Register />,
  },

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
