import React, { useState, useMemo } from 'react';
import './index.scss';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import LikeButton from '../LikeButton';
import { useNavigate } from 'react-router-dom';
import CourseDetails from '../CourseDetails';


export default function OwnedCard({ posts, id }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  // Add a conditional check for the `posts` object
  if (!posts) {
    return null; // Or render a placeholder if needed
  }

  return (
    <div className='main'>
    
    <div className='own-card' key={id}  onClick={() => navigate('/myCourse', {
          state: { id: posts?.postID, email: posts.userEmail },})}>
       
     <img
        className='course-photo'
        src={posts.postImage}
        alt='post-image'
       
        />
     
      <p className="own-Course-Name">{posts.CourseName}</p>
     
      <p
        className='owner'
        onClick={() =>
          navigate('/profile', {
            state: { id: posts?.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
     
    
      <div className='bottom'>
      
      </div>
      

      <div>
       
      </div>
    </div>
    </div>
  );
}
