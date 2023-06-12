import React , {useState}from 'react'
import "./index.scss";

export default function ProfileCard( { currentUser, onEdit}) {
    const [isEdit,setisEdit] = useState(false);
  return (
    <>
  <div className="profile-card">
    <div className='edit-btn'>
        <button onClick={ onEdit }>
        Edit
        </button>
    </div>
    <div>
      <div className='profile-info'>
    <h3 className='user-name'>
        {currentUser.name}
    </h3>
    <p className='Fullname'>
        {currentUser.Fullname}
    </p>
    <p className='user-email'>
        {currentUser.email}
    </p>
    </div>
  
    <div>
    <p className="Yos">Year:
      {currentUser.Year}
    </p>
    <p className='Branch'>
      {currentUser.Branch}
    </p>
    </div>
    </div>
    </div>
    </>
  )
}
