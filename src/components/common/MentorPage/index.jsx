import React, { useState, useMemo } from 'react';
import { courseStatus, videotatus,getMentorPosts } from '../../../api/FirestoreAPI';
import ModalComponent from '../Modal';
import Modal2 from '../Modal2';
import Modal1 from '../Modal1';
import { getUniqueId } from '../../../helpers/getUniqueId';
import { uploadPostImage,uploadPostVideo } from '../../../api/ImageUpload';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import CourseCard from '../CourseCard';
import "./index.scss"
export default function MentorPage({ currentUser }) {
  let userEmail = localStorage.getItem('userEmail');
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [CourseName, setCourseName] = useState('');
  const [Price, setPrice] = useState('');
  const [allStatuses, setAllStatuses] = useState([]);
  const [postImage, setPostImage] = useState('');
  const [postVideo,setPostVideo] = useState('');
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [Feature1,setFeature1] = useState('');
  const [Feature2,setFeature2] = useState('');
  const [Feature3,setFeature3] = useState('');
  const [Feature4,setFeature4] = useState('');
  const [Feature5,setFeature5] = useState('');

const [postID,setPostID] = useState('');
  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp('LLL'),
      userEmail: userEmail,
      userName: currentUser.name,
      postID: getUniqueId(),
      postImage: postImage,
      CourseName: CourseName,
      Price: Price,
      Feature1: Feature1,
      Feature2: Feature2,
      Feature3: Feature3,
      Feature4: Feature4,
      Feature5: Feature5
     
    };
    setPostID(object.postID);
    await courseStatus(object);
    setModalOpen(false);
    setStatus('');
    setModal2Open(true);
  };

  const sendVideo = async () => {
    let object = {
      timeStamp: getCurrentTimeStamp('LLL'),
      userEmail: userEmail,
      userName: currentUser.name,
      postID: {postID},
      postVideo: postVideo,
     
    };
    await videotatus(object);
    setModal2Open(false);
    setStatus('');
  };

  console.log(getCurrentTimeStamp('LLL'));
   
  useMemo(() =>{
    getMentorPosts (setAllStatuses,userEmail);
  },[]);

  return (
    <>
      <div className='Mentor-status-main'>
        <div className='Mentor-status'>
          <button className='open-course-modal' onClick={() => setModalOpen(true)}>
            Create a new course
          </button>
        </div>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        CourseName={CourseName}
        setCourseName={setCourseName}
        modal1Open ={modal1Open}
        setModal1Open={setModal1Open}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        Price={Price}
        setPrice={setPrice}
        uploadPostVideo ={uploadPostVideo }
        
      />
      <Modal2 
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        postVideo={postVideo}
        setPostVideo={setPostVideo}
        sendVideo={ sendVideo}
        CourseName={CourseName}
      />

      <Modal1
      modal1Open ={modal1Open}
      setModal1Open={setModal1Open}
      Feature1={Feature1}
      setFeature1={setFeature1}
      Feature2={Feature2}
      setFeature2={setFeature2}
      Feature3={Feature3}
      setFeature3={setFeature3}
      Feature4={Feature4}
      setFeature4={setFeature4}
      Feature5={Feature5}
      setFeature5={setFeature5}
      modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        sendStatus={sendStatus}
      />

      <div className='Mentor-cards'>
        {allStatuses.map((posts) => (
          <div key={posts.id}>
            <CourseCard posts={posts} id={posts.id} />
          </div>
        ))}
      </div>
    </>
  );
}
