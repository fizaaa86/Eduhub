import React from 'react'
import PaymentPage from './common/PaymentPage'
export default function PaymentComponent({currentUser}) {
  return (
    <div>
        <PaymentPage currentUser={currentUser} />
    </div>
  )
}
