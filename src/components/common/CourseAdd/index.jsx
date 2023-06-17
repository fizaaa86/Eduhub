import React ,{useState, useMemo }from 'react'
import {  getStatus} from '../../../api/FirestoreAPI';
import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import CourseCard from '../CourseCard';
import CourseDetails from '../CourseDetails';
import ModalComponent from "../Modal";
import { getUniqueId } from '../../../helpers/getUniqueId';
import { uploadPostImage } from '../../../api/ImageUpload';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
export default function CourseStatus({currentUser} ) {
  const [allStatuses, setAllStatus] = useState([]);
    useMemo(() =>{
getStatus(setAllStatus);
    },[]);

   
  return (
    <>
  
    <div className='Course-status-main'>
 

      <div className='quotation'>
        <h1 className='quote-head'>"An Investment in Knowledge pays the Best Interest" </h1>
        <p className="quote-foot">-Benjamin Franklin</p>
      </div>
      
      <div className='Page-title'>
        <p className='Page-title-home'>Home     |</p>
        
        <p>Courses</p>
      </div>
          
  <div className="Search-bar">
        <input className="Searching"type='text' placeholder='Search' />
        <AiOutlineSearch />
      </div>
          <div className='post-cards'>
          {allStatuses.map((posts) => {
              return (
                <div key={posts.id}>
                  <CourseCard posts={posts} id={posts.id} />

                
                </div>
                
              );
            })}
  
            

            


          </div>
    </div>
    </>
  )
}
