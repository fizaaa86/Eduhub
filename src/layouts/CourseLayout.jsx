import React , { useMemo ,useState}from 'react'
import Course from '../Pages/Course'
import Topbar from '../components/common/Topbar';
import SideBar from '../components/common/SideBar';
import { getCurrentUser } from '../api/FirestoreAPI';
import '../Sass/CourseComponent.scss'
export default function DashboardLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <div className='main-header'>
      <Course currentUser={currentUser} />
      </div>
     
      <div className='dashboard-content'>
        
      </div>
    </div>
  );
  
}
