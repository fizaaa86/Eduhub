import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SignIn from "../common/SignIn"
import SendMessage from './SendMessage';
import { onLogout } from '../../api/AuthAPI';
import { firestore } from '../../firebaseConfig';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';

const style = {
  main: `flex flex-col p-[10px] overflow-scroll`,
};

const Chat = ({currentCourse}) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(firestore,`${currentCourse}Room` ), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      // Scroll to the bottom when new messages are loaded
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        <span ref={scroll}></span>
      
      
      </main>
    </>
  );
};

export default Chat;
