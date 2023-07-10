import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection, postComment, postDoubts } from '../../../api/FirestoreAPI';
import { storage } from '../../../firebaseConfig';
import {AiFillCloseCircle} from "react-icons/ai"
import { getCurrentUser } from '../../../api/FirestoreAPI';
import { AiOutlineComment, AiOutlineFilePdf } from 'react-icons/ai';
import PaymentPage from '../PaymentPage';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import ChatComponent from '../../ChatComponent';
import { FaPaperPlane, FaQuestion } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import { firestore } from '../../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Cap from "../../../assets/Cap.png";
export default function TheOwned() {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [doubtsMessage, setDoubtsMessage] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentCourse,setCurrentCourse] = useState('')
  const [ Doubts,setDoubts] = useState('')

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  const getComment = (event) => {
    setComment(event.target.value);
  };
  const getDoubt = (event) => {
    setDoubtsMessage(event.target.value);
  };

  const handlePdfClick = (pdfUrl) => {
    navigate(`/materials?pdfUrl=${encodeURIComponent(pdfUrl)}`);
  };

  const addComment = (id) => {
    postComment(id, comment, getCurrentTimeStamp('LLL'), currentUser?.name, currentUser?.imageLink);
    setComment('');
  };

  const sendDoubtsMessage = (id, CourseName) => {
    postDoubts(id, doubtsMessage, getCurrentTimeStamp('LLL'), currentUser?.name, currentUser?.imageLink, CourseName);
    setDoubtsMessage('');
  };

  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setPosts, location?.state?.id);
    }
  }, [location]);
  
  useEffect(() => {
    posts.forEach((posting, index) => {
      const VideosListRef = ref(storage, `${posting.CourseName}/`);
      setCurrentCourse(posting.CourseName);
  
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
  
      const PdfListRef = ref(storage, `${posting.CourseName}-files/`);
  
      listAll(PdfListRef)
        .then((response) => {
          const promises = response.items.map((item) => getDownloadURL(item));
          return Promise.all(promises);
        })
        .then((urls) => {
          setPdfUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = urls;
            return updatedUrls;
          });
        })
        .catch((error) => {
          console.log('Error fetching PDF URLs:', error);
        });
    });
  }, [posts]);
  
// Rest of the code...

useEffect(() => {
  const fetchAnswers = async (currentCourse) => {
    const answersQuery = query(collection(firestore, 'Answers'), where('CourseName', '==', currentCourse));
    const answersSnapshot = await getDocs(answersQuery);
    const answersData = answersSnapshot.docs.map((doc) => doc.data());
    setAnswers(answersData);
  };

  if (posts.length > 0) {
    fetchAnswers(posts[0]?.CourseName);
  }
}, [posts]);

// Fetch doubts using useEffect
useEffect(() => {
  const fetchDoubts = async (currentCourse) => {
    const doubtsQuery = query(collection(firestore, 'Doubts'), where('CourseName', '==', currentCourse));
    const doubtsSnapshot = await getDocs(doubtsQuery);
    const doubtsData = doubtsSnapshot.docs.map((doc) => doc.data());
    setDoubts(doubtsData);
  };

  if (posts.length > 0) {
    fetchDoubts(posts[0]?.CourseName);
  }
}, [posts]);

// Rest of the code...

  
  // Rest of the code...
  

 console.log(Doubts)

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

              <div className="Videosection">
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
              </div>

              <div className="PDFs">
                <div className="Video-header">Materials</div>
                {pdfUrls[index] &&
                  pdfUrls[index].map((url, innerIndex) => (
                    <div key={innerIndex} className="Materialbox" onClick={() => handlePdfClick(url)}>
                      <AiOutlineFilePdf className="pdficon" />
                      <p className="pdftags">Material {innerIndex + 1}</p>
                    </div>

                  ))}
              </div>

              <div className="Chats">
                <button
                  className="chat-button"
                  onClick={() => navigate('/Chat', { state: { currentCourse: posting.CourseName } })}
                >
                  Discuss
                  <FaPaperPlane className="plane" />
                </button>

                <button className="doubts-button" onClick={() => setShowChat(true)}>
                  Doubts
                  <FaQuestion className="Question" />
                </button>

                {showChat && (
                  <div className="doubts-container">
                    <div className="doubts-header">
                      <h3>Doubts</h3>
                      <button className="close-button" onClick={() => setShowChat(false)}>
                        <AiFillCloseCircle className='close-circle' />
                      </button>
                    </div>
                    <div className="doubts-messages">
      {Doubts.map((doubt, index) => (
        <div key={index} className="doubt-message">
          <div className='doubt-box-cont'>
           <img  className="doubt-userimage" src={doubt.imageLink} />
           <p className='doubt-person'>{doubt.name}</p>
           </div>
           <p className='doubt-time'>{doubt.timeStamp}</p>
          <p className='doubt-content'>{doubt.doubtsMessage}</p>
         
        
          {/* Render additional doubt message details here */}
        </div>
      ))}
       <div className="Answers">
                      {answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="answer-section">
                          <div className="answer-user-detail">
                          
                           <img className='mentor-img' src={Cap} />
                           <p className='answer-person'>Mentor</p>
                          </div>
                         
                          <p className="answer-time">{answer.timeStamp}</p>
                          <p className="answer-comment">"{answer.doubtsMessage}"</p>
                        </div>
                      ))}
                    </div>
    </div>
                    <div className="doubts-input">
                      <input
                        type="text"
                        className='my-doubts'
                        placeholder="Ask your Questions"
                        value={doubtsMessage}
                        onChange={getDoubt}
                      />
                      <button  className="doubt-btn"onClick={() => sendDoubtsMessage(posting.postID, posting.CourseName)}>
                        <FaPaperPlane className='doubt-send' />
                      </button>
                    </div>
                 
                  </div>
                )}
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
