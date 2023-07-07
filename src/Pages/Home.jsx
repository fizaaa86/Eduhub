import React from 'react';
import '../Sass/HomeComponent.scss';
import img from "../assets/online-01.jpeg";
import Navbar from '../components/common/Navbar/Navbar';

export default function TinDog() {
  return (
    <div>
      <section className="colored-section" id="title">
        <div className="title-wrapper">
          <Navbar />
          <img className="title-image" src={img} alt="iphone-mockup" />
        </div>
      </section>
     
      <section id="features">
     
          <div className="col-lg-4" id="colom">
            <div className="class-1" id="classes">
              <i className="fa-sharp fa-solid fa-book fa-bounce fa-2xl"></i>
              <h3 className="mini">Materials</h3>
            
            <p className="short-title">Access a wide range of educational resources, including textbooks.</p>
          </div>
          <div className="col-lg-4" id="colom">
            <div className="class-2" id="classes">
              <i className="fa-solid fa-film fa-bounce"></i>
              <h3 className="mini1">Best Choices</h3>
            </div>
            <p className="short-title1">The app utilizes short videos to deliver educational contents and concepts.</p>
          </div>
          <div className="col-lg-4" id="colom">
            <div className="class-3" id="classes">
              <i className="fa-solid fa-circle-check fa-bounce"></i>
              <h3 className="mini2">Guaranteed</h3>
            </div>
            <p className="short-title2">Guarantees an enhanced learning experience through its comprehensive curriculum.</p>
          </div>
        </div>
      </section>
     

      <footer id="footer">
      <i className="social-icon fa-brands fa-facebook-f"></i>
        <i className="social-icon fa-brands fa-twitter"></i>
        <i className="social-icon fa-brands fa-instagram"></i>
        <i className="social-icon fa-solid fa-regular fa-envelope"></i>
        <p className="copyright">
          © {new Date().getFullYear()} EduHub
        </p>
      </footer>
    </div>
  );
}
