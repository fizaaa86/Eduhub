import React, { useEffect, useState, useMemo } from 'react';
import '../Sass/Cusat.scss';
import { useLocation } from 'react-router-dom';
import cusat from "../assets/cusatpic.png"
import CarouselItem from "../components/carousal";
import campus from "../assets/campus.jpg";
export default function Cusat() {
  
  return (
    <div className='Cusat-detail'>
      <div className='Cusat-detail-header'>
        

          
              <div className='Cusat-title'>
                <div className='left-section'>
                <img className='cusat-img' src={cusat} />
                <div className='title'>
                  <p className='Cusat-coursename'>Cochin University of Science And Technology</p>
                  <p className='bottomer'>("The official cusat only zone")</p>
                  </div>
                </div>
                 
                 
                          </div>

             
              <div className='App-desc'>
              <p className='desc-heading'>About</p>
              <div className='desc-sub'>
              Welcome to the Eduhub Cusat zone.

CUSAT zone is an online platform exclusively designed for CUSAT students, by CUSAT students. It serves as a centralized repository for all academic materials and resources contributed by students themselves. Here, you can find and download a wide range of materials, including previous year question papers, study materials, notes, and more, all curated and shared by fellow CUSAT students.

              </div>
                </div>
                <p className='mini-title'>What you Can do?</p>
              <div className='mini-features'>
           
                <ul>
                  <div className='rows'>
                  <li><p className='short-title'>Resource Repository:</p> Our platform hosts a comprehensive collection of academic resources that are organized and categorized for easy access. You can browse through various subjects, courses, and topics to find the specific materials you need.</li>
                
                  </div>
              <div className='rows'>
              <li><p className='short-title'>Previous Year Question Papers: </p> Gain an edge in your exams by accessing a vast collection of previous year question papers. These papers provide valuable insights into exam patterns, important topics, and help you prepare effectively.</li>
              </div>
               <div className='rows'>
               <li><p className='short-title'>Study Materials and Notes: </p>Enhance your learning experience with study materials and notes shared by fellow CUSAT students. Access well-organized and comprehensive study materials that cover various subjects and topics, making your academic journey more efficient and productive. </li>
               </div>
               <div className='rows'>
               <li><p className='short-title'>Contributions: </p> At this Page, we believe in the power of collaboration and knowledge-sharing. As a CUSAT student, you have the opportunity to contribute your own study materials, notes, and resources to help your peers. Your contributions can make a significant impact on the learning experience of other students. </li>
               </div>
                </ul>
                </div>

            </div>
      
      <div className='footer'>
       <div className='footer-heading'>Branch:</div>
        <select className='selection'>
  <option value="option1">Cs</option>
  <option value="option2">IT</option>
  <option value="option3">Mech</option>
</select>

    
      </div>
    </div>
  );
}
