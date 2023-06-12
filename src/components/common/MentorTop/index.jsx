import React ,{useState}from 'react';
import './index.scss';

import user from '../../../assets/user.png';
import MentorPop from '../MentorPop';
export default function MentorTop({ currentUser}) {
  const [popupVisible, setPopupVisible] = useState(false);
  
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <MentorPop />
        </div>
      ) : (
        <></>
      )}
     
      
      
      <img className='user' src={user} alt="user" onClick={displayPopup} />
      <p className='username'>{currentUser.name}</p>
      <p className="small-title">(Mentor)</p>
      
      
    </div>
  );
}
