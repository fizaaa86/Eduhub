import React, {useState,useMemo} from 'react'
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from '../components/common/ProfileEdit';
import { getSingleStatus, getSingleUser } from "../api/FirestoreAPI";
import user from "../assets/user.png"
import { useNavigate } from 'react-router-dom';
import { getMentorPosts } from '../api/FirestoreAPI';
import "../Sass/ProfileComponent.scss"
export default function ProfileComponent({ currentUser}) {
  let navigate = useNavigate();
  let userEmail = localStorage.getItem('userEmail');
  const [isEdit, setisEdit] = useState(false);
  const[course,setCourse] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const onEdit = () => {
    setisEdit(!isEdit);
  }
  useMemo(() =>{
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }

   
  },[]);

  return (
    <div className='Profile'>    
       { isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={ currentUser} />
       ): (
       <ProfileCard currentUser={currentUser} onEdit = {onEdit} />
      )}
      
      
      </div>
  )
}
