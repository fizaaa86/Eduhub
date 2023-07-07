import React,{useMemo,useState} from 'react'
import ChatComponent from '../components/ChatComponent'
import "../Sass/Chat.scss"
import { getAllUsers } from '../api/FirestoreAPI';
export default function Chat() {
    const [users,setUsers] =  useState([]);
    useMemo(() => {
        getAllUsers(setUsers);
      }, []);
      console.log(users);
  return (
    <div className='chatpage'>
         <div className="leftContainer">
            <div className='user-nav'>
                <p className='user-nav-head'>Users</p>
                </div>
        {users.map((user) => {
            return (
                <div>
                    <div className='user-div'>
                  
                    <img  className="chat-user-icon"src={user.imageLink}></img>

                    <p className='Chat-user'>{user.Fullname}</p>
                    </div>
                    </div>
            )
        })}
        </div>
        <div className='texting'>
    <ChatComponent />
    </div>
    </div>
  )
}
