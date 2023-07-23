import { Button, Modal } from 'antd';
import { useState,useMemo} from 'react';
import "./index.scss";
import {AiFillGithub,AiFillLinkedin} from "react-icons/ai"
import {FaEnvelope} from "react-icons/fa"
import { getCurrentUser,getSingleUser} from '../../../api/FirestoreAPI';
import Phone from "../../../assets/phone.png"
const ProfileModal = ({ modal1Open, setModal1Open,currentProfile,currentUser }) => {
    
  
   
  const onOk = () => {
    setModal1Open(false);
  };

  const handleClose = () => {
    setModal1Open(false);
  };
  

  return (
    <>
      <Modal
        title="Contact info"
        centered
        open={modal1Open}
        onCancel={handleClose}
        footer={[
          <Button key="submit" type="primary" onClick={onOk}>
            Close
          </Button>,
        ]}
      >
   <div className='github'>
          <div className='github-inner'>
            <AiFillGithub className='git-icon' />
            <p className='github-head'>Your Github</p>
          </div>
          <a className="git-link" href={currentProfile?.GitHub || currentUser?.GitHub}>
            {currentProfile?.GitHub || currentUser?.GitHub}
          </a>
        </div>

   
        {/* Display Email */}
        <div className='mail'>
          <div className='mail-inner'>
            <FaEnvelope className='git-icon' />
            <p className='mail-head'>Your Email</p>
          </div>
          <a className="git-link" href={currentProfile?.email || currentUser?.email}>
            {currentProfile?.email || currentUser?.email}
          </a>
        </div>

        {/* Display LinkedIn */}
        <div className='LinkedIn'>
          <div className='link-inner'>
            <AiFillLinkedin className='git-icon' />
            <p className='link-head'>Your LinkedIn</p>
          </div>
          <a className="git-link" href={currentProfile?.LinkedIn || currentUser?.LinkedIn}>
            {currentProfile?.LinkedIn || currentUser?.LinkedIn}
          </a>
        </div>

        {/* Display Phone Number */}
        <div className="phone-number">
          <img className="phone" src={Phone} />
          <p className="no-head">Your Phone Number</p>
          <p className='number'>{currentProfile?.phone || currentUser?.phone}</p>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
