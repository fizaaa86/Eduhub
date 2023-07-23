import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser,getMentorPosts } from "../../../api/FirestoreAPI";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

import ProfileModal from "../ProfileModal";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const[course,setCourse] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modal1Open, setModal1Open] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
 
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };


  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }

    let userEmail = currentProfile?.email; // Replace 'email' with the actual property name from currentProfile

    // Check if userEmail is null or undefined, then use userEmail from localStorage
    if (!userEmail) {
      userEmail = localStorage.getItem('userEmail');
    }

    // Check if userEmail matches with currentUser.userEmail
    const isCurrentUserMentor = userEmail === currentUser?.userEmail;

    if (userEmail) {
      if (isCurrentUserMentor) {
        // Use currentUser.userEmail for getMentorPosts
        getMentorPosts(setCourse, currentUser.userEmail);
      } else {
        // Use userEmail for getMentorPosts
        getMentorPosts(setCourse, userEmail);
      }
    }

    console.log(currentUser.userEmail);
  }, [currentProfile, currentUser.userEmail]); // Make sure to include currentProfile and currentUser.userEmail as dependencies

  // ... (rest of the component)

// Make sure to include currentProfile and currentUser.userEmail as dependencies

  // ... (rest of the component)

  


  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
  
      <ProfileModal
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        currentProfile={currentProfile}
        currentUser={currentUser}
      />

      <div className="profile-carding">
      
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={onEdit} />
          </div>
      
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.Fullname
                : currentProfile?.name}
            </h3>
            <div className="mini-heading">
              <p className="year">{currentUser.YOS} Year</p>
              <p className="heading">
                {Object.values(currentProfile).length === 0
                  ? currentUser.Branch
                  : currentProfile?.Branch}
              </p>
            </div>
            <p className="College">School of Engineering, Cusat</p>
          </div>
  
          <div className="right-info">
            <button
              className="open-profile-modal"
              onClick={() => setModal1Open(true)}
            >
              Contact info
            </button>
            <h1></h1>
          </div>
        </div>
      </div>
      
      
      <div className='profile-inner'>
        <div className='profilecourse' 
              >
        {course.map((courses) => {
            return (
              <div  className="mycoursesec"key={courses.id}
              onClick={() => navigate('/Course', {
                state: { id: courses?.postID, email: courses.userEmail },})}
              >
                <div className='mycoursehead'>
                <img className='myimages' src={courses.postImage} />
                <p className='mycourses'>{courses.CourseName}</p>
                </div>
                <p className='mycoursestat'>{courses.status}</p>
               
              </div>
            );
          })}
        </div>
      </div>
      
    </>
  );
                }  