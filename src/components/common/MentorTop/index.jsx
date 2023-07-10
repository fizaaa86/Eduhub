import React, { useState } from 'react';
import './index.scss';
import Logo from '../../../assets/logo.png';
import { AiOutlineSearch } from "react-icons/ai";
import user from '../../../assets/user.png';
import ProfilePopup from '../ProfilePopup';
import { BsArrowDownSquareFill } from "react-icons/bs";
import double from "../../../assets/double.png";
import MentorPop from "../MentorPop"

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
 
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const imageSrc = currentUser.imageLink ? currentUser.imageLink : user;

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <MentorPop />
        </div>
      ) : (
        <></>
      )}


      <img className='user' src={imageSrc} alt="user"onClick={displayPopup} />
      
    </div>
  );
}
