import React, { useState } from 'react';
import { Button, Modal, Progress } from "antd";
import './index.scss';
import { AiOutlinePicture } from 'react-icons/ai';

const ModalComponent = ({ 
  modalOpen, 
  setModalOpen,
  setStatus,
  setPostImage,
  uploadPostImage,
  postImage,
  sendStatus,
  status,
  CourseName,
  setCourseName,
  Price,
  setPrice,
  Feature1,
    setFeature1,
    Feature2,
    setFeature2,
    Feature3,
    setFeature3,
    Feature4,
    setFeature4,
    Feature5,
    setFeature5,
    modal1Open,
     setModal1Open,
     isEdit,
     setisEdit,
     updateStatus
    
    

}) => {
  const [progress, setProgress] = useState(0);
  

  return (
    <>
      <Modal
        title="Create your Course"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          setStatus("");
          setPostImage("");
        }}
        onCancel={() =>{ 
          setModalOpen(false);
          setStatus("");
          setPostImage("");
        }}
        footer={[
          <Button 
            onClick={() =>{
               
              setModal1Open(true);
            }}
            key="submit" 
            type="primary" 
            disabled={status.length > 0 ? false : true}
          >
           {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <div className='posts-body'>
          <input
            onChange={(event) => setCourseName(event.target.value)}
            className="common-input"
            placeholder="Course-Name"
            name="CourseName"
            value={CourseName}
          />
          <input
  onChange={(event) => {
    if (isEdit) {
      // Call the updateStatus function or perform the update logic
      updateStatus(event.target.value);
    } else {
      setStatus(event.target.value);
    }
  }}
  className="common-input"
  placeholder="Course-Description"
  name="status"
  value={status}
/>

          <input
            onChange={(event) =>  setPrice(event.target.value)}
            className="common-input"
            placeholder="Price"
            name="Price"
            value={Price}
          />

          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 ? (
            <>
             <img
              className="preview-image"
              src={postImage}
              alt="postImage"
            />
            </>
           
          ) : (
            <></>
          )}

        </div>

        <label htmlFor="pic-upload"> 
          <AiOutlinePicture  size={35} className='picture-icon' />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden 
          onChange={(event) => uploadPostImage(event.target.files[0], setPostImage)}
        />

     
      </Modal>
    </>
  );
};

export default ModalComponent;
