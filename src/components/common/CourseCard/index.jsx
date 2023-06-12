import React, { useState, useMemo } from 'react';
import './index.scss';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import LikeButton from '../LikeButton';
import { useNavigate } from 'react-router-dom';
import CourseDetails from '../CourseDetails';


export default function CourseCard({ posts, id }) {
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
    <div className='posts-card' key={id}>
     
      <p className="Course-Name">{posts.CourseName}</p>
      <p className='status'>{posts.status}</p>
      <p
        className='name'
        onClick={() =>
          navigate('/profile', {
            state: { id: posts?.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className='timestamp'>{posts.timeStamp}</p>
     
     <img
        className='post-photo'
        src={posts.postImage}
        alt='post-image'
        onClick={() => navigate('/Course', {
          state: { id: posts?.postID, email: posts.userEmail },})}
        />
      <div className='bottom'>
      <p className='Course-Price'> &#8377; {posts.Price}</p>
      <p className='Like-btn'></p>
   


      <LikeButton userID={currentUser?.id} postId={posts.id} />
      </div>
      

      <div>
       
      </div>
    </div>
  );
}
