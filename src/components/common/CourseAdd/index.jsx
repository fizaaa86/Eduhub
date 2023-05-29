import React ,{useState, useMemo }from 'react'
import { courseStatus, getStatus} from '../../../api/FirestoreAPI';
import './index.scss';
import CourseCard from '../CourseCard';
import ModalComponent from "../Modal";
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
export default function CourseStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [allStatuses,setAllStatus] = useState([]);
    const sendStatus =  async () => {
      let object = {
        status: status,
        timeStamp: getCurrentTimeStamp('LLL'),
      };
      await  courseStatus(status);
      await setModalOpen(false);
      await setStatus("");
    };
    console.log(getCurrentTimeStamp('LLL'));
    useMemo(() =>{
getStatus(setAllStatus);
    },[]);
    
  return (
    <>
  
    <div className='Course-status-main'>
        <div className='Course-status'>
            <button className='open-course-modal'onClick={() => setModalOpen(true)}>
                Create a new course
                </button>
         </div>
         <ModalComponent 
          setStatus= {setStatus}
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          status={status}
          sendStatus={sendStatus}
          />
          <div className='post-cards'>
          {allStatuses.map((posts) => {
              return <CourseCard posts ={posts} />;
            
          })}
          </div>
    </div>
    </>
  )
}


