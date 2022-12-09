import './App.css';
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",  //base url
    element: <BaseLayout />,
    children: [

      //home url
      

      //about url
      {
        path: "/about",   // /post/:id 
        element: <div>About</div>,
      },

      //register url
      {
        path: "/register", 
        element: <Register />,
      },

      
    ]
  },

  //login url
  {
    path: "/login", 
    element: <Login />,
  },

  {
    path: "/dashboard", 
    element: <Home />,
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
