import React from 'react'
import MentorComponent from '../components/MentorComponent'
export default function Mentor({currentUser}) {
  return (
    <div>
    <MentorComponent currentUser={currentUser} />
    </div>
  )
}
