import React , { useMemo ,useState}from 'react'
import { getCurrentUser } from '../api/FirestoreAPI';
import Payment from '../Pages/Payment';
export default function DashboardLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <div className='main-header'>
     
      </div>
     
      <div className='dashboard-content'>
      <Payment currentUser={currentUser} />
      </div>
    </div>
  );
  
}
