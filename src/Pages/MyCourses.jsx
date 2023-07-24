import React from 'react'
import MyCoursesComponent from '../components/MyCoursesComponent'
export default function MyCourses({currentUser}) {
  return (
    <div>
        <MyCoursesComponent currentUser = {currentUser} />
    </div>
  )
}
