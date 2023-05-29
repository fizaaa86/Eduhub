import React , { useMemo }from 'react'
import DashBoard from '../Pages/DashBoard';
import Topbar from '../components/common/Topbar';
import SideBar from '../components/common/SideBar';
import { getCurrentUser } from '../api/FirestoreAPI';
export default function DashboardLayout() {
  useMemo(() => {
      getCurrentUser();
  },[])
  return (
    <div className='main'>
      
        <Topbar />
        <SideBar />
         <DashBoard />
        
        
      
     </div>
  )
}
