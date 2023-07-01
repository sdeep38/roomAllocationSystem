import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import AllocateRooms from './pages/AllocateRooms';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import PageNotFound from './components/PageNotFound';


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

const PrivateRoutes = ({ auth }) => {
  return (
    auth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

function App() {
  const { currentUser } = useContext(AuthContext)

  let role = currentUser?.authorizedAs;
  let isLoggedIn = currentUser?.isuserloggedin;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route element={<PrivateRoutes auth={isLoggedIn} />}>
            <Route exact path="dashboard" element={<Home />} />
            <Route exact path="profile" element={<Profile/>} />
            <Route exact path="allocateRooms" element={role === 'admin' ? <AllocateRooms /> : <PageNotFound />} />
          </Route>
          <Route exact path="*" element={<PageNotFound />} />
        </Route>
        <Route exact path="/login" element={isLoggedIn ? <Navigate to={'/dashboard'} /> : <Login />} />
        <Route exact path="/fpass" element={<ForgotPassword />} />
        <Route path="/passwordReset/" element={<ResetPassword />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
