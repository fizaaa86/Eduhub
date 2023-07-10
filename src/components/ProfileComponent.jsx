import React, {useState,useMemo} from 'react'
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from '../components/common/ProfileEdit';
import user from "../assets/user.png"
import { useNavigate } from 'react-router-dom';
import { getMentorPosts } from '../api/FirestoreAPI';
import "../Sass/ProfileComponent.scss"
export default function ProfileComponent({ currentUser}) {
  let navigate = useNavigate();
  let userEmail = localStorage.getItem('userEmail');
  const [isEdit, setisEdit] = useState(false);
  const[course,setCourse] = useState([]);
  const onEdit = () => {
    setisEdit(!isEdit);
  }
  useMemo(() =>{
    getMentorPosts (setCourse,userEmail);
  },[]);

  return (
    <div className='Profile'>    
       { isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={ currentUser} />
       ): (
       <ProfileCard currentUser={currentUser} onEdit = {onEdit} />
      )}
      <div className='profile-inner'>
        <div className='profilecourse' 
              >
        {course.map((courses) => {
            return (
              <div  className="mycoursesec"key={courses.id}
              onClick={() => navigate('/Course', {
                state: { id: courses?.postID, email: courses.userEmail },})}
              >
                <div className='mycoursehead'>
                <img className='myimages' src={courses.postImage} />
                <p className='mycourses'>{courses.CourseName}</p>
                </div>
                <p className='mycoursestat'>{courses.status}</p>
               
              </div>
            );
          })}
        </div>
      </div>
      </div>
  )
}
