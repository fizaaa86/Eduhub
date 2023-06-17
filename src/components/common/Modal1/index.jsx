import React, { useState } from 'react';
import { Button, Modal, Progress } from "antd";
import './index.scss';

const Modal1 = ({
    modal1Open, 
    setModal1Open,
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
    modal2Open,
      setModal2Open,
      sendStatus,
  status,
  Feature6,setFeature6,
  description,setdescription
   
  }) => {

    return (
        <>  
          <Modal
            title="Upload Videos"
            centered
            open={modal1Open}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button 
              onClick={sendStatus}
                key="submit" 
                type="primary" 
              >
                Submit
              </Button>
            ]}
          >
            <div className='Features'>
                <h3>Any 5 feautes of the course:</h3>
                <input
            onChange={(event) => setFeature1(event.target.value)}
            className="common-input"
            placeholder="Feature-1"
            name="Feature1"
            value={Feature1}
          />
          <input
            onChange={(event) => setFeature2(event.target.value)}
            className="common-input"
            placeholder="Feature-2"
            name="Feature-2"
            value={Feature2}
          />
          <input
            onChange={(event) =>  setFeature3(event.target.value)}
            className="common-input"
            placeholder="Feature-3"
            name="Feature-3"
            value={Feature3}
          />
           <input
            onChange={(event) =>  setFeature4(event.target.value)}
            className="common-input"
            placeholder="Feature-4"
            name="Feature-4"
            value={Feature4}
          />
           <input
            onChange={(event) =>  setFeature5(event.target.value)}
            className="common-input"
            placeholder="Feature-5"
            name="Feature-5"
            value={Feature5}
          />
           <input
            onChange={(event) =>  setFeature6(event.target.value)}
            className="common-input"
            placeholder="Feature-6"
            name="Feature-6"
            value={Feature6}
          />
          <textarea
          placeholder='App description'
          value={description}
          onChange={(event) =>  setdescription(event.target.value)}
         
        />
            </div>
           
          </Modal>
        </>
      );
    };
    
    export default Modal1;
    