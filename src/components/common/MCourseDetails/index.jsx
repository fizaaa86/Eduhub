import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection } from '../../../api/FirestoreAPI';
import { useNavigate } from 'react-router-dom';
import PaymentPage from '../PaymentPage';
import { AiOutlineComment } from 'react-icons/ai';
import { getComments } from '../../../api/FirestoreAPI';


export default function MCourseDetails({ currentUser, id }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setPosts, location?.state?.id);
    }
  }, [location?.state?.id]);

  useEffect(() => {
    posts.forEach((posting, index) => {
      getComments(posting.postID, (data) => {
        setComments((prevComments) => [...prevComments, ...data]);
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

  const handleCloseReview = () => {
    setShowCommentBox(false);
  };

  return (
    <div className="Course-detail">
      <div className="Course-detail-header">
        {posts.map((posting) => {
          const data = {
            CourseName: posting.CourseName,
            status: posting.status,
            Price: posting.Price,
            postImage: posting.postImage,
          };

          return (
            <div key={posting.id}>
              <div className="Course-title">
                <div className="left-part">
                  <p className="posting-coursename">{posting.CourseName}</p>
                  <p className="posting-coursename-footer">{posting.status}</p>
                  <div className="sub">
                    <div className="sub-left">
                      <p className="course-owner">
                        Created by{' '}
                        <span
                          className="blue-underline"
                          onClick={() =>
                            navigate('/profile', {
                              state: { id: posting?.userID, email: posting.userEmail },
                            })
                          }
                        >
                          {posting.userName}
                        </span>
                      </p>
                      <p className="Course-date">{posting.timeStamp}</p>
                    </div>
                    <p className="Course-Pricing">&#8377;{posting.Price}</p>
                  </div>
                </div>
                <img className="posting-photo" src={posting.postImage} alt="post-image" />
              </div>

              <div className="App-desc">
                <p className="desc-heading">Description</p>
                <div className="desc-sub">{posting.description}</div>
              </div>
              <h1 className='Course-Features'>Course Features</h1>
              <div className="App-features">
               
                <ul>
                  <div className="row">
                    <li>{posting.Feature1}</li>
                    <li>{posting.Feature2}</li>
                  </div>
                  <div className="row">
                    <li>{posting.Feature3}</li>
                    <li>{posting.Feature4}</li>
                  </div>
                  <div className="row">
                    <li>{posting.Feature5}</li>
                    <li>{posting.Feature6}</li>
                  </div>
                </ul>
              </div>
              <div className="User-reviews">
                <div className="User-review-inner">
                  <AiOutlineComment className="Comment-icon" />
                  <p className="User-give-review">User Reviews</p>
                </div>
                <div className="Userreviews">
                
                  {comments.map((comment, index) => (
                    <div key={index} className="User-review-section">
                      <div className='user-review-user-detail'>
                      <img className='review-pic' src={comment.imageLink} />
                      <p className='user-review-username'>{comment.name}</p>
                      </div>
                      <p className='user-review-time'>{comment.timeStamp}</p>
                      <p className='User-Comment'>"{comment.comment}"</p>
                     
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
     
    </div>
  );
}
