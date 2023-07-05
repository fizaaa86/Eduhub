import React, { useEffect, useState ,useMemo} from 'react';
import './index.scss';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection, postComment } from '../../../api/FirestoreAPI';
import { storage } from '../../../firebaseConfig';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import { AiOutlineComment } from 'react-icons/ai';
import PaymentPage from '../PaymentPage';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export default function TheOwned() {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
      getCurrentUser(setCurrentUser);
  },[])
  const getComment = (event) => {
    setComment(event.target.value);
  };
console.log(currentUser?.name)
  const addComment = (id) => {
    postComment(id, comment, getCurrentTimeStamp('LLL'),currentUser?.name,currentUser?.imageLink)
      
        setComment('');
      
      
  };
  

  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setPosts, location?.state?.id);
    }
  }, [location]);

  useEffect(() => {
    posts.forEach((posting, index) => {
      const VideosListRef = ref(storage, `${posting.CourseName}/`);

      listAll(VideosListRef)
        .then((response) => {
          const promises = response.items.map((item) => getDownloadURL(item));
          return Promise.all(promises);
        })
        .then((urls) => {
          setVideoUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = urls;
            return updatedUrls;
          });
        })
        .catch((error) => {
          console.log('Error fetching video URLs:', error);
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
    <div className="Course-detail">
      <div className="Course-detail-header">
        {posts.map((posting, index) => {
          const data = {
            CourseName: posting.CourseName,
            status: posting.status,
            Price: posting.Price,
            postImage: posting.postImage,
          };

          return (
            <div key={posting.id}>
              <div className="Course-titles">
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
                   
                  </div>
                </div>
                <img className="posting-photo" src={posting.postImage} alt="post-image" />
              </div>

              <div className="App-desc">
                <p className="desc-heading">Description</p>
                <div className="desc-sub">{posting.description}</div>
              </div>

              <div className="Video-header">Videos</div>
              <div className="Videos">
                <div className="VideoList">
                  {videoUrls[index] &&
                    videoUrls[index].map((url, innerIndex) => (
                      <div key={innerIndex} className="Videobox">
                        <p className="videotags">Video {innerIndex + 1}</p>
                        <video controls className="videosource">
                          <source src={url} />
                        </video>
                      </div>
                    ))}
                </div>
              </div>
<div className='Materials'>

  </div>
              <div className="course-footing">
                <div className="review-inner" onClick={() => setShowCommentBox(true)}>
                  <AiOutlineComment className="Comment-icon" />
                  <p className="give-review">Review</p>
                </div>
                {showCommentBox && (
                  <div className="reviews">
                    <input
                      onChange={getComment}
                      placeholder="Add a Review"
                      className="comment-input"
                      name="comment"
                      value={comment}
                    ></input>
                    <button className="add review" onClick={() => addComment(posting.postID)}>
  Add Review
</button>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}