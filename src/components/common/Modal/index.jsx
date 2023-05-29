import React from 'react';
import {Button,Modal } from 'antd';
import './index.scss';
const ModalComponent = ( { 
    modalOpen, 
    setModalOpen,
    setStatus,
    sendStatus,
    status,
    }) => {
  
  return (
    <>
      <Modal
        title="Create your Course"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
     
        footer={[
          <Button 
          onClick={sendStatus}
           key="submit" 
           type="primary" disabled={status.length > 0 ? false : true}>
            Upload
          </Button>,
         
        ]}
        >
       <input className='modal-input'
       placeholder='What course do you want to upload?'
       onChange={(event) => setStatus(event.target.value)}
       value={status}
       />
 
      </Modal>
    </>
  );
};

export default ModalComponent;