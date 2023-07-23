import React , { useMemo ,useState}from 'react'
import DashBoard from '../Pages/DashBoard';
import Topbar from '../components/common/Topbar';
import SideBar from '../components/common/SideBar';
import { getCurrentUser } from '../api/FirestoreAPI';
import '../Sass/DashBoardComponent.scss'
export default function DashboardLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <Topbar currentUser={currentUser} />
      <SideBar />
      <div className='dashboard-content'>
        <DashBoard currentUser={currentUser} />
      </div> 
    </div>
  );
  
}
