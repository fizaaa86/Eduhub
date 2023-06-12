import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import HeadBar from '../HeadBar';
import './index.scss';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const [items, setItems] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(firestore, 'item')); // Replace 'item' with your collection name
        const querySnapshot = await getDocs(q);
        const itemData = querySnapshot.docs.map((doc) => doc.data());
        setItems(itemData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="Payment-main">
      <HeadBar />
      <div className="Payment-sub">
        <div className="Payment-left">Checkout</div>
        <div className="Payment-right">
          <div className="Payment-right-sub">Summary</div>
          <div className="Payment-right-down">
            {items.map((item) => (
              <div key={item.id}>
                <p className="Selected-course">{item.CourseName}</p>
                <div className="Bill-top">
                  <p className="Org-amt">
                    <div className='line-1'>
                      <span className="label">Original Price:</span>&#8377;
                      <span className='Amt'>{item.Price}</span> 
                    </div>
                    <div className='line-2'>
                      <span className="label1">Discounts:</span>&#8377;
                      <span className='Amt'>0</span> 
                    </div>
                    <hr className="line-divider" />
                    <div className='Total'>
                    <span className="label3">Grand Total:</span>&#8377;
                      <span className='Amt'>{item.Price}</span> 
                    </div>
                    <div className='disclaimer'>
                    By completing your purchase you agree to these Terms of Service.
                    </div>
                  </p>
                  </div>
                 <button className='Buy-btn' onClick={() => navigate('/mycourses') }>Purchase</button>
                {/* Render other item details */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
