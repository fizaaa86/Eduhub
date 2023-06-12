import React from 'react'
import './index.scss';
import Logo from "../../../assets/logo.png"
import {
    AiFillHome,
    AiOutlineUserSwitch,
    AiFillMessage,
    AiFillBook ,
    AiOutlineLogout,
  } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
export default function SideBar() {
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  }
  return (
    <div className='react-icons'>
      <div className='logo-container'>
        <img className='logo' src={Logo} alt="Logo" />
        <h1 className='logo-label'>EduHub</h1>
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
        <span className="icon-label underline" >Courses</span>
  <hr className="horizontal-line" />
  </div>
        <div className='react-icon'>
        <div className='icon-only'>
        < AiOutlineUserSwitch size={20}/>
        </div> 
        <span className="icon-label underline" onClick={() => goToRoute("/profile")}>Profile</span>
  <hr className="horizontal-line" />
  </div>
        <div className='react-icon'>
        <div className='icon-only'>
        <AiFillMessage size={20} />
        </div> 
        <span className="icon-label underline">Notifications</span>
  <hr className="horizontal-line" />
  </div>
        <div className='react-icon'>
        <div className='icon-only'>
        <AiOutlineLogout size={20}/>
        </div> 
        <span className="icon-label underline">Logout</span>
  <hr className="horizontal-line" />
  </div>
    </div>
  )
}
