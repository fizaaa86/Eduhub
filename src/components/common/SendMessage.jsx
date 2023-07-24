import React, { useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getCurrentUser } from "../../api/FirestoreAPI";
import { FaPaperPlane } from "react-icons/fa";

const styles = {
  form: "form",
  input: "input",
  button: "button",
};

const SendMessage = ({ scroll, currentCourse }) => {
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState();
  getCurrentUser(setCurrentUser);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }

    const { uid, displayName } = auth.currentUser;
    console.log(currentUser);
    await addDoc(collection(firestore, `${currentCourse}Room`), {
      // Add "Room" suffix to currentCourse
      text: input,
      name: displayName ? displayName : currentUser.Fullname,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="SendMessage">
      <form onSubmit={sendMessage} className={styles.form}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Message"
        />
        <button className={styles.button} type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
