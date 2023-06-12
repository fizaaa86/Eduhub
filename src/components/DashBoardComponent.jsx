import React,{useState} from 'react'
import CourseStatus from './common/CourseAdd'
import '../Sass/DashBoardComponent.scss'
export default function DashBoardComponent({ currentUser }) {
  return ( 
    
  <div className="dash-component">
   <CourseStatus currentUser ={currentUser} />
    </div>
  );
}
