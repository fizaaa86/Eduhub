import React, { useState } from "react";
import ChatNavbar from "./common/ChatNavbar";
import Chat from "./common/Chat";
import SendMessage from "./common/SendMessage";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import "../Sass/Chat.scss";

const styles = {
  appContainer: "appContainer",
  sectionContainer: "sectionContainer",
  leftContainer: "leftContainer", // CSS class for the left container
};

function ChatComponent() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const currentCourse = location?.state?.currentCourse;
  const id = location?.state?.id;
  const [postImage, setPostImage] = useState("");

  async function searchDocument(currentCourse) {
    const collectionRef = collection(firestore, "Courses");

    const q = query(collectionRef, where("CourseName", "==", currentCourse));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // Handle the matching document here
      const { postImage } = doc.data();
      console.log("Matching Document:", postImage);
      // Access the postImage field from the document data
      setPostImage(postImage); // Set the postImage state variable
    });
  }

  // Call the searchDocument function with the currentCourse value
  searchDocument(currentCourse);

  console.log("Current Course:", currentCourse); // Log the value of currentCourse

  return (
    <div className="Chatroom">
      <div className={styles.appContainer}>
        <section className={styles.sectionContainer}>
          {/* Side Navbar */}
          <ChatNavbar currentCourse={currentCourse} postImage={postImage} />
          <Chat currentCourse={currentCourse} />
        </section>
        <SendMessage className="brr" currentCourse={currentCourse} />
      </div>
    </div>
  );
}

export default ChatComponent;
