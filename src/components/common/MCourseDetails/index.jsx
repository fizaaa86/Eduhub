import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';
import { getSingleStatus, createFirestoreCollection } from '../../../api/FirestoreAPI';
import { useNavigate } from 'react-router-dom';
import PaymentPage from '../PaymentPage';
import { AiOutlineComment,AiOutlineFilePdf,AiFillDelete} from 'react-icons/ai';
import {MdDelete} from "react-icons/all"
import { getComments } from '../../../api/FirestoreAPI';
import { Document, Page, pdfjs } from 'react-pdf'; // Step 1: Import Document, Page, and pdfjs
import { ref, getDownloadURL, listAll ,deleteObject} from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import Modal2 from "../Modal2"
import MaterialUpload from "../MaterialUpload"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MCourseDetails({ currentUser, id }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]); // Step 2: State variable for video URLs
  const [pdfUrls, setPdfUrls] = useState([]); // Step 2: State variable for PDF URLs
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
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

  
  

  const handleCloseReview = () => {
    setShowCommentBox(false);
  };

  const deleteVideo = (path) => {
    console.log(path);
    const storageRef = ref(storage, `${decodeURIComponent(path)}`);
    deleteObject(storageRef)
      .then(() => {
        console.log('Video deleted successfully.');
        window.location.reload()
        // Optionally, you may want to update the state to remove the deleted video URL from the videoUrls array.
        // For simplicity, let's assume videoUrls is not updated here, and the component will refresh to reflect the changes.
      })
      .catch((error) => {
        console.error('Error deleting video:', error);
      });
  };

  const handlePdfClick = (pdfUrl) => {
    navigate(`/materials?pdfUrl=${encodeURIComponent(pdfUrl)}`);
  };



  function getPathStorageFromUrl(url){

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/eduhub-de9b2.appspot.com/o/";

    let imagePath = url.replace(baseUrl,"");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0,indexOfEndPath);
    
    imagePath = imagePath.replace("%2F","/");

    deleteVideo(imagePath)
}
  


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
            

              {/* Step 4: Render Videos */}
              <div className="Videos">
              <div className="Video-header">Videos</div>
            

{/* Render Modal2 for video uploading */}
<Modal2
  modal2Open={modal2Open}
 
  setModal2Open={setModal2Open}
  
  CourseName={posting?.CourseName} // Replace 'posting?.CourseName' with the actual property name from posting
  // Pass the handleDeleteVideo function to Modal2
/>
<MaterialUpload
                  modal3Open={modal3Open}
                  setModal3Open={setModal3Open}
                  CourseName={posting?.CourseName} 
             />


                <div className="VideoList">
                  {videoUrls[index] &&
                    videoUrls[index].map((url, innerIndex) => (
                      <div key={innerIndex} className="Videobox">
                        <p className="videotags">Video {innerIndex + 1}</p>
                        <video controls className="videosource">
                          <source src={url} />
                        </video>
                        <MdDelete style={{"height":"70px","width":"50px"}} onClick={() => getPathStorageFromUrl(url)}/>
                      </div>
                    ))}
                </div>
                <button className='videoadd' onClick={() => setModal2Open(true)}>Upload Videos</button>
              </div>

              {/* Step 4: Render PDFs */}
              <div className="PDFs">
              <button
                  className="Resources"
                  onClick={() => {
                    setModal3Open(true);
                  }}
                  />
                <div className="Video-header">Materials</div>
                {pdfUrls[index] && pdfUrls[index].length > 0 ? (
                  pdfUrls[index].map((url, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="Materialbox"
                    >
                      <AiOutlineFilePdf className="pdficon" />
                      <p className="pdftags" onClick={() => handlePdfClick(url)}>Material {innerIndex + 1}</p>
                      <MdDelete style={{"height":"50px","width":"50px"}} onClick={() => getPathStorageFromUrl(url)}/>
                    </div>
                  ))
                ) : (
                  <div className="Materialbox">
                    <p>No materials</p>
                  </div>
              
                )}
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
