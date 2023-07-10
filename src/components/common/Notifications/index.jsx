import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';
import { getMentorPosts } from '../../../api/FirestoreAPI';
import { getDoubts } from '../../../api/FirestoreAPI';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { postAnswers } from '../../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import { FaPaperPlane } from 'react-icons/fa';
import {BsFillBellFill} from "react-icons/bs"
export default function Notifications() {
  let userEmail = localStorage.getItem('userEmail');
  let location = useLocation();
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [Doubts, setDoubts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [doubtsMessage, setDoubtsMessage] = useState('');
  const [Answers, setAnswers] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');

  const getAnswers = (event) => {
    setAnswers(event.target.value);
    setSelectedCourseName(event.target.dataset.coursename); // Set the course name from the data attribute
  };

  const sendDoubtsMessage = () => {
    postAnswers(
      Answers, // Use the Answers state variable
      getCurrentTimeStamp('LLL'),
      currentUser?.name,
      currentUser?.imageLink,
      selectedCourseName
    );
    setDoubtsMessage('');
    setAnswers(''); // Clear the answers field after sending the doubts message
    setSelectedCourseName(''); // Clear the selected course name
  };

  useEffect(() => {
    getMentorPosts(setPosts, userEmail);
  }, []);

  useEffect(() => {
    posts.forEach((posting, index) => {
      getDoubts(posting.postID, (data) => {
        setDoubts((prevDoubts) => [...prevDoubts, ...data]);
      });
    });
  }, [posts]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="notifications">
        <div className='msg-header'>
      
      <BsFillBellFill className="notify-icon" />
      <p className='notify-header'>Notifications</p>
      </div>
      <div className="messages">
        
        <div className="Userreviews">
          {Doubts.map((Doubt, index) => (
            <div key={index} className="message-section">
              <div className="messenger-detail">
                <img className="messenger-pic" src={Doubt.imageLink} alt="User Review" />
                <p className="messenger">{Doubt.name}</p>
              </div>
              <p className="messenger-course"> From "{Doubt.CourseName}"</p>
              <p className="user-time">{Doubt.timeStamp}</p>
              <p className="User-Q">"{Doubt.doubtsMessage}"</p>
              
              <div className="message-input">
                <input
                  type="text"
                    className='message-box'
                  placeholder="Answer"
                  value={Answers}
                  onChange={getAnswers}
                  data-coursename={Doubt.CourseName} // Set the course name as a data attribute
                />
                <button className='Answer-btn' onClick={sendDoubtsMessage}><FaPaperPlane /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
