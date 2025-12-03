import React from 'react';
import './CTASection.css';

const CTASection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-gradient"></div>
        <div className="cta-noise"></div>
      </div>
      <div className="container">
        <div className="cta-content" data-aos="fade-up">
          <h2 className="cta-title">Ready to level up your hotel or resort?</h2>
          <p className="cta-subtitle">
            Let's discuss how we can transform your property into an exceptional guest experience
          </p>
          <button
            className="cta-button"
            onClick={() => scrollToSection('contact')}
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

