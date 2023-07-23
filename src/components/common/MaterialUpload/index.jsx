import React, { useState } from 'react';
import { Button, Modal, Progress } from "antd";
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytesResumable } from "firebase/storage";

export default function FileUploadModal({
  modal3Open,
  setModal3Open,
  getImage,
  currentImage,
  progress,
  CourseName,
}) {
  const [numMaterials, setNumMaterials] = useState(1);
  const [files, setFiles] = useState([]);
  const [fileProgress, setFileProgress] = useState([]);

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = selectedFile;
      return updatedFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const storageRef = ref(storage, `${CourseName}-files`);
      const progressArray = Array.from(Array(numMaterials)).map(() => 0);
      setFileProgress(progressArray);

      for (let i = 0; i < numMaterials; i++) {
        const file = files[i];
        if (file) {
          const materialRef = ref(storageRef, `${CourseName}_file${i}`);
          const uploadTask = uploadBytesResumable(materialRef, file);

          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressArray[i] = progress;
            setFileProgress([...progressArray]);
          });

          await uploadTask;
        }
      }
      setFiles([]);
      setFileProgress([]);
    }
  };

  return (
    <Modal
      title="Upload Files"
      centered
      visible={modal3Open}
      onOk={() => setModal3Open(false)}
      onCancel={() => setModal3Open(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleUpload}
          disabled={files.length === 0}
        >
          Upload
        </Button>,
      ]}
    >
      <div>
        <label htmlFor="num-materials">Number of Materials:</label>
        <input
          id="num-materials"
          type="number"
          min={1}
          value={numMaterials}
          onChange={(e) => setNumMaterials(Number(e.target.value))}
        />
        {Array.from(Array(numMaterials)).map((_, index) => (
          <div key={index}>
            <input type="file" onChange={(e) => handleFileChange(e, index)} />
            {fileProgress[index] !== 0 && (
              <div className="progress-bar">
                <Progress type="circle" percent={fileProgress[index]} />
              </div>
            )}
          </div>
        ))}
        
      </div>
    </Modal>
  );
}
