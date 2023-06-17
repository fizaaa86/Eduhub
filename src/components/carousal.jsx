import React from 'react';

const CarouselItem = ({ active, text, imageSrc, caption }) => {
  return (
    <div className={`carousel-item ${active ? 'active' : ''}`} style={{ padding: '7% 15%' }}>
      <h2 style={{ fontSize: '2.5rem', lineHeight: '1.5', fontWeight: '900' }}>{text}</h2>
      <img src={imageSrc} alt="profile" style={{ width: '10%', borderRadius: '100%' }} />
      <em>{caption}</em>
    </div>
  );
};

const TestimonialCarousel = () => {
  return (
    <div id="testimonial-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <CarouselItem active text="Found my true love." imageSrc="images/dog-img.jpg" caption="Times of India, Delhi" />
        <CarouselItem text="My dog used to be so lonely, but with TinDog's help, they've found the love of their life. I think." />
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default TestimonialCarousel;
