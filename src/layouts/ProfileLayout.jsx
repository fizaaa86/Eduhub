import React , { useMemo ,useState}from 'react'
import Profile from '../Pages/Profile';
import Topbar from '../components/common/Topbar';
import SideBar from '../components/common/SideBar';
import { getCurrentUser } from '../api/FirestoreAPI';
export default function DashboardLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <Topbar currentUser={currentUser} />
      <SideBar />
      <Profile currentUser={currentUser} />
        
      
     </div>
  )
}
