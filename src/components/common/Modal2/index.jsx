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

  const uploadFiles = () => {
    const files = Array.from(imageUpload);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `${CourseName}/${file.name}`);
        uploadBytesResumable(imageRef, file).then((snapshot) => {
          setProgress(Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          );
          console.log(progress);    
          getDownloadURL(snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => reject(error));
        });
      });
    });

    Promise.all(promises)
      .then((urls) => {
        setImageUrls((prev) => [...prev, ...urls]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        const promises = response.items.map((item) => {
          return getDownloadURL(item);
        });

        Promise.all(promises)
          .then((urls) => {
            setImageUrls((prev) => [...prev, ...urls]);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>  
      <Modal
        title="Upload Videos"
        centered
        open={modal2Open}
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
          return <img src={url} alt="uploaded" key={url} />;
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
        })}
      </Modal>
    </>
  );
};

export default Modal2;
