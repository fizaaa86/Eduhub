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
import TheOwned from "../components/common/TheOwned";
import Cusat from "../Pages/Cusat";
import Chat from "../Pages/Chat"
import MCourseLayout from "../layouts/MCourseLayout";
import Materials from "../Pages/Materials";
import Cs from "../Pages/Cs"
import It from "../Pages/It"
import Ec from "../Pages/ec";
import Mech from "../Pages/mech"
import Statistics from "../layouts/StatLayout"
import Notifications from "../layouts/DoubtLayout"

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
      path: "/messages",
      element: <Notifications />,
      
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
    {
      path: "/Cs",
      element: <Cs/>,
    },
    {
      path: "/it",
      element: <It/>,
    },
    {
      path: "/ec",
      element: <Ec/>,
    },
    {
      path: "/mec",
      element: <Mech/>,
    },
    {
      path: "/myCourse",
      element: <TheOwned />
    },
    {
      path: "/stat",
      element: <Statistics />
    },

    {
      path: "/Cusat",
      element: <Cusat />
    },
    {
      path: "/Chat",
      element: <Chat />
    },
    {
      path: "/MentorCourses",
      element: <MCourseLayout />
    },
    {
      path: "/materials",
      element: <Materials />
    }

  ]);