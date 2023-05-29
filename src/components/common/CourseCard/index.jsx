import React from 'react';
import './index.scss';

export default function CourseCard({ posts }) {
  
  return (
    <div className='course-card'>
      <p className='status'>{posts.status}</p>
    </div>
  );
}

