import React from 'react'
import MCourseDetails from './common/MCourseDetails'
export default function MCourseComponent({currentUser}) {
  return (
    <div>
   <MCourseDetails currentUser = {currentUser} />
    </div>
  )
}
