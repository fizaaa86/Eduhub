import React from 'react'
import Owned from './common/Owned'
export default function MyCoursesComponent({currentUser}) {
  return (
    <div>
        <Owned currentUser= {currentUser}/>
    </div>
  )
}
