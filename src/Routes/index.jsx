import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import DashboardLayout from "../layouts/DashBoardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

  },  
  
  {
      path: "/login",
      element: <Login />,

    },
    {
      path: "/register",
      element: <Register />,
      
    },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      
    },
  ]);