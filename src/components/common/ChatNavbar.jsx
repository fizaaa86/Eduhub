import React from "react";
import SignIn from "./SignIn";
import LogOut from "./LogOut";
import { auth } from "../../firebaseConfig";
import "../../Sass/Chat.scss";
import { useAuthState } from "react-firebase-hooks/auth";

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4 fixed w-full top-0`,
  heading: `text-white text-3xl`,
};

const Navbar = ({ currentCourse, postImage }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="ChatNavbar">
      <img className="Chaticon" src={postImage} alt="Post Image" />
      <h1 className="chatroomname">{currentCourse}</h1>
    </div>
  );
};

export default Navbar;
