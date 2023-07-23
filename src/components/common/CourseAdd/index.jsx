import React, { useState, useMemo } from 'react';
import { getStatus } from '../../../api/FirestoreAPI';
import './index.scss';
import { AiFillHome } from 'react-icons/ai';
import HelpBot from '../HelpBot';
import CourseCard from '../CourseCard';
import user from '../../../assets/user.png';
import Search from '../Search';

export default function CourseStatus({ currentUser }) {
  const [allStatuses, setAllStatus] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  const imageSrc = currentUser.imageLink ? currentUser.imageLink : user;

  return (
    <>
      <div className='Course-status-main'>
        <div className='searches'>
          <Search setsearchInput={setsearchInput} searchInput={searchInput} />
        </div>
        <img className='user-img' src={imageSrc} alt="user" />
        <p className='welcoming'>Welcome,</p>
        <p className='my'> Student {currentUser.name}</p>

        <div className='Page-title'>
          <div className='home-icon'><AiFillHome /></div>
          <p className='Page-title-home'>Home</p>
        </div>

        <div className='post-cardings'>
          {allStatuses.map((posts) => {
            return (
              <div key={posts.id}>
                <CourseCard posts={posts} id={posts.id} />
              </div>
            );
          })}
        </div>
        <div className='helpbot-container'>
        <HelpBot />
        </div>
      </div>
    </>
  );
}
