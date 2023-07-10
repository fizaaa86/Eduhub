import React , { useMemo ,useState}from 'react'
import Doubts from '../Pages/Doubts';
import MentorTop from '../components/common/MentorTop';
import MentorSide from "../components/common/MentorSide"
import { getCurrentUser } from '../api/FirestoreAPI';

export default function DoubtLayout() {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  return (
    <div className='main'>
      <MentorTop currentUser={currentUser} />
      <MentorSide />
      <div className='dashboard-content'>
        <Doubts currentUser={currentUser} />
      </div>
    </div>
  );
  
}
