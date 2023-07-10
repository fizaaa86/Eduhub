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
import {BsGraphUpArrow} from "react-icons/bs"
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
        <h1 className='logo-name'>EduHub</h1>
      </div>
    <div className='react-icon'>
  <div className='icon-only'>
    <AiFillHome size={20} />
  </div> 
  <span className="icon-label underline" onClick={() => goToRoute("/mentor")}>Home</span>
  <hr className="horizontal-line" />
</div>

       
        <div className='react-icon'>
        
        <div className='icon-only'>
             <BsGraphUpArrow size={20} />
        </div> 
        <span className="icon-label underline"onClick={() => goToRoute("/stat")} >Statistics</span>
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
        <span className="icon-label underline" onClick={() => goToRoute("/messages")}>Notifications</span>
  <hr className="horizontal-line" />
  </div>
        
    </div>
  )
}
