import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import DashboardLayout from "../layouts/DashBoardLayout";
import ProfileLayout from "../layouts/ProfileLayout"
import CourseLayout from "../layouts/CourseLayout"
import MyCoursesLayout from "../layouts/MyCoursesLayout";
import PaymentPage from "../components/common/PaymentPage";
import MentorLayout from "../layouts/MentorLayout";

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
      path: "/profile",
      element: <ProfileLayout />,
      
    },


    {
      path: "/dashboard",
      element: <DashboardLayout />,
      
    },

    {
      path: "/course",
      element: <CourseLayout />,
      
    },
   {
      path: "/payment",
      element: < PaymentPage />,
      
    },
    {
      path: "/mycourses",
      element: <MyCoursesLayout />,
      
    },

    {
      path: "/mentor",
      element: <MentorLayout />,
    },

  ]);