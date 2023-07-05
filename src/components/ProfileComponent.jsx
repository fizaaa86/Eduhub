import React, {useState} from 'react'
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from '../components/common/ProfileEdit';
import user from "../assets/user.png"
import "../Sass/ProfileComponent.scss"
export default function ProfileComponent({ currentUser}) {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  }
  return (
    <div>
      <div className='profile-inner'>
      <img className='usering' src={user} alt="user" />
      <p className='profile-title'>Profile</p>
      </div>
       { isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={ currentUser} />
       ): (
       <ProfileCard currentUser={currentUser} onEdit = {onEdit} />
      )}
      </div>
  )
}
