import React, { useState } from 'react';
import './index.scss';
import Logo from "../../../assets/logo.png";
import cusat from "../../../assets/cusat.png";

import {
  AiFillHome,
  AiOutlineUserSwitch,
  AiFillMessage,
  AiFillBook,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const [showHelpBot, setShowHelpBot] = useState(false);
  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
  };

  const toggleHelpBot = () => {
    setShowHelpBot(!showHelpBot);
  };

  return (
    <div className='react-icons'>
      <div className='logo-container'>
        <img className='logo' src={Logo} alt="Logo" />
        <h1 className='logo-name'>EduHub</h1>
      </div>
      <div className='react-icon'>
        <div className='icon-only'>
          <AiFillHome size={20} />
        </div> 
        <span className="icon-label underline" onClick={() => goToRoute("/dashboard")}>Home</span>
        <hr className="horizontal-line" />
      </div>
      <div className='react-icon'>
        <div className='icon-only'>
          <AiFillBook size={20} />
        </div> 
        <span className="icon-label underline" onClick={() => goToRoute("/mycourses")}>Courses</span>
        <hr className="horizontal-line" />
      </div>
      <div className='react-icon'>
        <div className='icon-only'>
          <AiOutlineUserSwitch size={20} />
        </div> 
        <span className="icon-label underline" onClick={() => goToRoute("/profile")}>Profile</span>
        <hr className="horizontal-line" />
      </div>
      <div className='react-icon'>
        <div className='icon-only'>
          <FaGraduationCap size={20} />
        </div> 
        <span className="icon-label underline" onClick={() => goToRoute("/Cusat")}>Cusat</span>
        <hr className="horizontal-line" />
      </div>
     
    </div>
  );
}
