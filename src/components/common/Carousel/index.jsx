import React, { useEffect } from 'react';
import "./index.scss";

export default function Carousal({ img1 }) {
  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(currentSlide - index) * 100}%)`;
        slide.style.transition = 'transform 1s ease-in-out'; // Adjust the transition duration here (e.g., 1s for 1 second)
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    }

    setInterval(nextSlide, 3000);

    return () => {
      clearInterval(nextSlide);
    };
  }, []);

  return (
    <div className="slideshow">
      <div className="slide">
        <img className="pic1" src={img1} alt="Slide 4" />
      </div>
      <div className="slide">Slide 2</div>
      <div className="slide">Slide 3</div>
    </div>
  );
}
