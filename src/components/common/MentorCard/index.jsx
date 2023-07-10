import React, { useState, useMemo } from 'react';
import './index.scss';
import { getCurrentUser,deletePost } from '../../../api/FirestoreAPI';
import LikeButton from '../LikeButton';
import { useNavigate } from 'react-router-dom';
import CourseDetails from '../CourseDetails';
import { BsPencil,BsTrash } from 'react-icons/bs';


export default function MentorCard({ posts, id,getEditData }) {
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
    <div className='mentor-card' key={id} >
     <div className='change-container'>
      <BsPencil size={20} className='action-icon' onClick={() => getEditData(posts)} />
      <BsTrash size={20} className='action-icon' onClick={() =>deletePost(posts.id)} />
     </div>
      <p className="mentorCourse-Name"onClick={() => navigate("/MentorCourses", {
      state: { id: posts?.postID, email: posts.userEmail },})}>{posts.CourseName}</p>
      <p className='status'>{posts.status}</p>
      
    
      <p className='mentortimestamp'>{posts.timeStamp}</p>
     
     <img
        className='mentor-post-photo'
        src={posts.postImage}
        alt='post-image'
       
        />
      
      <div className='Mentor-Price'><p className='rupee'> &#8377; </p>
      <p className='amt-course'>{posts.Price}</p></div>
      
   


      
   
      

      <div>
       
      </div>
    </div>
  );
}
