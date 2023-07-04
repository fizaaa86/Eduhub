import React, { useState ,useMemo} from 'react'
import './index.scss';
import { getVideos } from '../../../api/FirestoreAPI';
import OwnedCard from '../OwnedCard';
export default function Owned() {
  const [owned,setowned] = useState([]);
  useMemo(() =>{
   getVideos(setowned);
        },[]);
  return (
    <div className='Owned'>
        <p className='my-title'>My courses</p>
        <div className='mycourse'>
      {owned.map((myposts) => {
              return (
                <div key={myposts.id}>
                
                  <OwnedCard posts={myposts} id={myposts.id} />
                  
                
                </div>
                
              );
            })}
  </div>
    </div>
  )
}
