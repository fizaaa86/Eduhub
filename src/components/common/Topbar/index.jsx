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
      <div className='logo-container'>
        <img className='logo' src={Logo} alt="Logo" />
        <h1 className='logo-label'>EduHub</h1>
      </div>
      <div className="Search-bar">
        <input className="Searching"type='text' placeholder='Search' />
        <AiOutlineSearch />
      </div>
      <div className='users'>
      <img className='user' src={user} alt="user" onClick={displayPopup} />
      </div>
      
    </div>
  );
}
