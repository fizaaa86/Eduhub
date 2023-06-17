import { Button, Modal, Progress } from "antd";
import React, { useState, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { storage } from "../../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable, listAll } from "firebase/storage";

const Modal2 = ({
  modal2Open,
  setModal2Open,
  postVideo,
  setPostVideo,
  sendVideo,
  uploadPostVideo,
  CourseName
}) => {
  const [progress, setProgress] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, `${CourseName}/`);

  const uploadFiles = async () => {
    try {
      const files = Array.from(imageUpload);
      const urls = [];

      for (const file of files) {
        const imageRef = ref(storage, `${CourseName}/${file.name}`);
        const snapshot = await uploadBytesResumable(imageRef, file);
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));

        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }

      setImageUrls(prev => [...prev, ...urls]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await listAll(imagesListRef);
        const promises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(promises);
        setImageUrls(prev => [...prev, ...urls]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <>  
      <Modal
        title="Upload Videos"
        centered
        visible={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={[
          <Button 
            onClick={sendVideo}
            key="submit" 
            type="primary" 
          >
            Submit
          </Button>
        ]}
      >
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files);
          }}
          multiple
        />
        <button onClick={uploadFiles}>Upload Images</button>
        {imageUrls.map((url) => {
          return (
            <React.Fragment key={url}>
              <img src={url} alt="uploaded" />
              {(progress === 0 || progress === 100) ? null : (
                <div className="progress-bar">
                  <Progress type="circle" percent={progress} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </Modal>
    </>
  );
};

export default Modal2;
