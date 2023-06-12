import React ,{useState}from 'react';
import './index.scss';
import Logo from '../../../assets/logo.png';

export default function HeadBar({ currentUser}) {
 
  return (
    <div className="HeadBar-main">
   
      <div className='logo-container'>
        <img className='logo' src={Logo} alt="Logo" />
        <h1 className='logo-label'>EduHub</h1>
      </div>

      
      
    </div>
  );
}