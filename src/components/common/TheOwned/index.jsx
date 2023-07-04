import React, { useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection } from '../../../api/FirestoreAPI';
import { storage } from "../../../firebaseConfig";
import { AiOutlineComment } from 'react-icons/ai';
import PaymentPage from '../PaymentPage';
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default function TheOwned() {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setPosts, location?.state?.id);
    }
  }, [location]);

  useEffect(() => {
    posts.forEach((posting) => {
      const VideosListRef = ref(storage, `${posting.CourseName}/`);

      listAll(VideosListRef)
        .then((response) => {
          const promises = response.items.map((item) => getDownloadURL(item));
          return Promise.all(promises);
        })
        .then((urls) => {
          setVideoUrls((prevUrls) => [...prevUrls, urls]);
        })
        .catch((error) => {
          console.log("Error fetching video URLs:", error);
        });
    });
  }, [posts]);

  const handleCreateCollection = (data) => {
    createFirestoreCollection(data);
  };

  const handleBuyClick = (data) => {
    handleCreateCollection(data);
    navigate('/payment');
  };

  return (
    <div className='Course-detail'>
      <div className='Course-detail-header'>
        {posts.map((posting, index) => { // Add index parameter to map function
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
                        >
                          {posting.userName}
                        </span>
                      </p>
                      <p className='Course-date'>{posting.timeStamp}</p>
                    </div>
                    <p className='Course-Pricing'>&#8377;{posting.Price}</p>
                  </div>
                </div>
                <img className='posting-photo' src={posting.postImage} alt='post-image' />
              </div>

              <div className='App-desc'>
                <p className='desc-heading'>Description</p>
                <div className='desc-sub'>{posting.description}</div>
              </div>

              <div className='Video-header'>Videos</div>
              <div className='Videos'>
                <div className='VideoList'> {/* Create a container for video list and paragraph tags */}
                  {videoUrls[index] && videoUrls[index].map((url, innerIndex) => (
                    <div key={innerIndex} className='Videobox'>
                        <p className='videotags'>Video {innerIndex + 1}</p> {/* Render paragraph tags next to each video */}
                      <video controls className='videosource'>
                        <source src={url} />
                      </video>
                    
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='course-footing'>
        <div className='reviews'>
          <div className='review-inner'>
            <AiOutlineComment />
            write your review
          </div>
          <input placeholder='Add a Review' className='comment-input'></input>
          <button className='add review'>Add Review</button>
        </div>
      </div>
    </div>
  );
}
