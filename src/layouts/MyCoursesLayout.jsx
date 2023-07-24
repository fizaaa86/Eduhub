import React, { useMemo, useState } from "react";
import MyCourses from "../Pages/MyCourses";
import Topbar from "../components/common/Topbar";
import SideBar from "../components/common/SideBar";
import { getCurrentUser } from "../api/FirestoreAPI";
import "../Sass/DashBoardComponent.scss";
export default function MyCoursesLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="main">
      <Topbar currentUser={currentUser} />
      <SideBar />
      {/* {console.log(currentUser)} */}
      <div className="dashboard-content">
        <MyCourses currentUser = {currentUser} />
      </div>
    </div>
  );
}
