import React , { useMemo ,useState}from 'react'
import Mentor from '../Pages/Mentor';
import MentorTop from '../components/common/MentorTop';
import MentorSide from "../components/common/MentorSide"
import { getCurrentUser } from '../api/FirestoreAPI';

export default function DashboardLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <MentorTop currentUser={currentUser} />
      <MentorSide />
      <div className='dashboard-content'>
        <Mentor currentUser={currentUser} />
      </div>
    </div>
  );
  
}
