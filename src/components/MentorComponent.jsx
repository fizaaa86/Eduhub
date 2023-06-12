import React from 'react'
import MentorPage from './common/MentorPage'
export default function MentorComponent({currentUser}) {
  return (
    <div>
      <MentorPage currentUser={currentUser} />
    </div>
  )
}
