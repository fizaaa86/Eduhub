import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Sass/Cusat.scss";
import Carousal from "../components/common/Carousel";
import Campus from "../assets/Campus.jpg";
import Cap from "../assets/cap.png";

const Cusat = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const goToCourse = () => {
    if (selectedBranch) {
      navigate(selectedBranch);
    }
  };

  return (
    <div className="mainPage">
      <div className="Cusat-detail">
        <div className="Cusat-detail-header">
          <div className="Cusat-title">
            
              <div className="title">
                <div className="Cusat-caption">
                  <img className="cap" src={Cap} alt="Cap" />
                  <p className="Cusat-coursename">Cusat Zone</p>
                 
                </div>
              
              
            </div>
          </div>
      
          <div className="Cusat-desc">
            <p className="Cusat-desc-heading">About</p>
            <div className="desc-sub">
              Welcome to the Eduhub Cusat zone. CUSAT zone is an online platform exclusively designed for CUSAT students, by CUSAT students. It serves as a centralized repository for all academic materials and resources contributed by students themselves. Here, you can find and download a wide range of materials, including previous year question papers, study materials, notes, and more, all curated and shared by fellow CUSAT students.
            </div>
          </div>
          <p className="Cusat-mini-title">What you Can do?</p>
          <div className="mini-features">
            <ul>
              <div className="rows">
                <li>
                  <p className="Cusat-short-title">Resource Repository:</p> Our platform hosts a comprehensive collection of academic resources that are organized and categorized for easy access. You can browse through various subjects, courses, and topics to find the specific materials you need.
                </li>
              </div>
              <div className="rows">
                <li>
                  <p className="Cusat-short-title">Previous Year Question Papers: </p> Gain an edge in your exams by accessing a vast collection of previous year question papers. These papers provide valuable insights into exam patterns, important topics, and help you prepare effectively.
                </li>
              </div>
              <div className="rows">
                <li>
                  <p className="Cusat-short-title">Study Materials and Notes: </p>Enhance your learning experience with study materials and notes shared by fellow CUSAT students. Access well-organized and comprehensive study materials that cover various subjects and topics, making your academic journey more efficient and productive.
                </li>
              </div>
              <div className="rows">
                <li>
                  <p className="Cusat-short-title">Contributions: </p> At this Page, we believe in the power of collaboration and knowledge-sharing. As a CUSAT student, you have the opportunity to contribute your own study materials, notes, and resources to help your peers. Your contributions can make a significant impact on the learning experience of other students.
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="cs-footer">
          <div className="cusat-footer-heading">Branch:</div>
          <select className="selection dropdown" value={selectedBranch} onChange={handleBranchChange}>
            <option value="">Select a Branch</option>
            <option value="/cs">Computer Science</option>
            <option value="/ec">Electronics and Communication</option>
            <option value="/mec">Mechanical Engineering</option>
            <option value="/it">Information Technology</option>
          </select>
          <br />
          <br />
          <button className="goto-course-button" onClick={goToCourse}>Go to Course</button>
        </div>
      </div>
    </div>
  );
};

export default Cusat;
