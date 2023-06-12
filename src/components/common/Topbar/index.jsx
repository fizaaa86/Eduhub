import React ,{useState}from 'react';
import './index.scss';
import Logo from '../../../assets/logo.png';
import { AiOutlineSearch } from "react-icons/ai";
import user from '../../../assets/user.png';
import ProfilePopup from '../ProfilePopup';
export default function Topbar({ currentUser}) {
  const [popupVisible, setPopupVisible] = useState(false);
  
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
     
      
      
      <img className='user' src={user} alt="user" onClick={displayPopup} />
      <p className='username'>{currentUser.name}</p>
      <p className="small-title">(Student)</p>
      
      
      
    </div>
  );
}
