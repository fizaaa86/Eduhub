import React, { useState } from 'react';
import { Button, Modal, Progress } from "antd";
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
export default function Modal2({
  modal2Open,
  modal3Open,
  setModal3Open,
  setModal2Open,
  postVideo,
  setPostVideo,
  sendVideo,
  uploadPostVideo,
  CourseName
}) {
  const [numVideos, setNumVideos] = useState(1);
  const [videos, setVideos] = useState([]);
  const [videoProgress, setVideoProgress] = useState([]);

  const handleVideoChange = (e, index) => {
    const selectedVideo = e.target.files[0];
    setVideos(prevVideos => {
      const updatedVideos = [...prevVideos];
      updatedVideos[index] = selectedVideo;
      return updatedVideos;
    });
  };
  console.log(CourseName)

  const handleUpload = async () => {
    if (videos.length > 0) {
      const storageRef = ref(storage, `${CourseName}`);
      const progressArray = Array.from(Array(numVideos)).map(() => 0);
      setVideoProgress(progressArray);

      for (let i = 0; i < numVideos; i++) {
        const video = videos[i];
        if (video) {
          const videoRef = ref(storageRef, `${CourseName}_video${i}`);
          const uploadTask = uploadBytesResumable(videoRef, video);

          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressArray[i] = progress;
            setVideoProgress([...progressArray]);
          });

          await uploadTask;
        }
      }
      setVideos([]);
      setVideoProgress([]);
    }
  };

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
            key="submit"
            type="primary"
            onClick={handleUpload}
            disabled={videos.length === 0}
          >
            Upload
          </Button>,
          <Button
            key="next"
            type="primary"
            onClick={()=>toast.success("Video")}
          >
            Submit
          </Button>
        ]}
      >
        <div>
          <label htmlFor="num-videos">Number of Videos:</label>
          <input
            id="num-videos"
            type="number"
            min={1}
            value={numVideos}
            onChange={(e) => setNumVideos(Number(e.target.value))}
          />
          {Array.from(Array(numVideos)).map((_, index) => (
            <div key={index}>
              <input type="file" onChange={(e) => handleVideoChange(e, index)} />
              {videoProgress[index] !== 0 && (
                <div className="progress-bar">
                  <Progress type="circle" percent={videoProgress[index]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
