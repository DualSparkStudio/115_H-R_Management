import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: 'LuxeStay transformed our resort from struggling to thriving. Their strategic approach and hands-on management increased our occupancy by 45% in just 8 months.',
      name: 'Sarah Chen',
      role: 'Property Owner',
      property: 'Oceanview Grand Resort',
    },
    {
      quote: 'The team\'s expertise in operations and guest experience is unmatched. We\'ve seen consistent improvements in guest satisfaction scores and revenue.',
      name: 'Michael Rodriguez',
      role: 'General Manager',
      property: 'Metropolitan Plaza Hotel',
    },
    {
      quote: 'Working with LuxeStay was a game-changer. They understood our vision and executed flawlessly, helping us open our boutique property with excellence from day one.',
      name: 'Emma Thompson',
      role: 'Founder & Owner',
      property: 'Alpine Boutique Lodge',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testimonials-header" data-aos="fade-up">
          <h2 className="section-title">Trusted by Property Owners</h2>
          <p className="section-subtitle">
            Real results from properties we've transformed
          </p>
        </div>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="testimonial-quote">
                <svg
                  width="48"
                  height="36"
                  viewBox="0 0 48 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 18C0 8 4 4 12 4C20 4 24 8 24 18C24 28 20 32 12 32C4 32 0 28 0 18ZM24 18C24 8 28 4 36 4C44 4 48 8 48 18C48 28 44 32 36 32C28 32 24 28 24 18Z"
                    fill="currentColor"
                    opacity="0.1"
                  />
                </svg>
                <p className="quote-text">{testimonial.quote}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  <p className="author-property">{testimonial.property}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

