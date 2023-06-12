import React from 'react'
import CourseDetails from './common/CourseDetails'
export default function CourseComponent({currentUser}) {
  return (
    <div>
   <CourseDetails currentUser = {currentUser} />
    </div>
  )
}
