import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection } from '../../../api/FirestoreAPI'; // Assuming you have a function for creating a Firestore collection
import { useNavigate } from 'react-router-dom';
import PaymentPage from '../PaymentPage';

export default function CourseDetails({ currentUser }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setPosts, location?.state?.id);
    }
  }, []);

  const handleCreateCollection = (data) => {
    createFirestoreCollection(data); // Call your Firestore function with the data object
  };

  const handleBuyClick = (data) => {
    handleCreateCollection(data); // Call the handleCreateCollection function when Buy button is clicked
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div className='Course-detail'>
      <div className='Course-detail-header'>
        {posts.map((posting) => {
          // Create the data object
          const data = {
            CourseName: posting.CourseName,
            status: posting.status,
            Price: posting.Price,
            postImage: posting.postImage,
          };

          return (
            <div key={posting.id}>
              <div className='Course-title'>
                <div className='left-part'>
                  <p className='posting-coursename'>{posting.CourseName}</p>
                  <p className='posting-coursename-footer'>{posting.status}</p>
                  <div className='sub'>
                    <div className='sub-left'>
                      <p className='course-owner'>
                        Created by{' '}
                        <span
                          className='blue-underline'
                          onClick={() =>
                            navigate('/profile', {
                              state: { id: posting?.userID, email: posting.userEmail },
                            })
                          }
                         
                        ></span>
                      </p>
                      <p className='Course-date'>{posting.timeStamp}</p>
                    </div>
                    <p className='Course-Pricing'>&#8377;{posting.Price}</p>
                  </div>
                </div>
                <img className='posting-photo' src={posting.postImage} alt='post-image' />
              </div>
              <div className='App-features'>
                <p>{posting.Feature1}</p>
                <p>{posting.Feature2}</p>
                <p>{posting.Feature3}</p>
                <p>{posting.Feature4}</p>
                <p>{posting.Feature5}</p>
                </div>
            </div>
          );
        })}
      </div>
      <div className='footer'>
        <button className='Cart'>Add to Cart</button>
        {posts.map((posting) => {
          // Create the data object
          const data = {
            CourseName: posting.CourseName,
            status: posting.status,
            Price: posting.Price,
            postImage: posting.postImage,
          };

          return (
            <button key={posting.id} className='Payment' onClick={() => handleBuyClick(data)}>
              Buy
            </button>
          );
        })}
      </div>
    </div>
  );
}
