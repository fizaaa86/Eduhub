import React from "react";
import { auth } from "../../firebaseConfig";
import "../../Sass/Chat.scss";

const Message = ({ message }) => {
  const isSent = message.uid === auth.currentUser.uid;
  const messageClass = isSent ? "sent" : "received txtPadding";
  const nameClass = isSent ? "senderName" : "receiverName";

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <p className={`name ${nameClass}`}>{message.name}</p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
