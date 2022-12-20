import './App.css';
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
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

      //about url
      {
        path: "/about",   
        element: <div>About</div>,
      },

      
      
    ]
  },

   //dashboard url
   {
    path: "/dashboard",
    element: <Home />,
  },

  //login url
  {
    path: "/login", 
    element: <Login />,
  },

  {
    path: "/profile", 
    element: <Profile />,
  },

  {
    path: "/allocateRooms",
    element: <AllocateRooms />
  },

  {
    path: "/fpass",
    element: <AllocateRooms />
  },

  //register url
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
