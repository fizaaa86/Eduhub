import React, { useState, useEffect, useMemo } from 'react';
import { getMentorPosts, getAllUsers } from '../api/FirestoreAPI';
import '../Sass/Stat.scss';

export default function Statistics({ currentUser }) {
  let userEmail = localStorage.getItem('userEmail');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useMemo(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    getMentorPosts(setCourses, userEmail);
  }, []);

  const calculateTotalPrice = (price, userCount) => {
    const numericPrice = parseInt(price);
    return numericPrice * userCount;
  };

  return (
    <div className="Stat-main">
      <p className='Header'>Course Statistics</p>
      {courses.map((course) => (
        <div className="stat-courses" key={course.id}>
          <div className='stat-header'>
            <img className='stat-img' src={course.postImage} />
            <p className='stat-CourseName'>{course.CourseName}</p>
          </div>
          {/* Render other course-related data */}
          <div className="students-enrolled">
            <p className='students'>Students Enrolled: <span style={{ color: '#00FF40' }}>{users.length}</span></p>
            {users.map((user) => (
              <div key={user.id}>
                <div className='user-contents'>
                  <img className="user-students" src={user.imageLink} />
                  <p className="student">{user.name}</p>
                </div>
              </div>
            ))}
            <p className='Income'>Income: <span style={{ color: 'red', fontWeight:'800' }}>&#8377;{calculateTotalPrice(course.Price, users.length)}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}
