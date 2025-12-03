import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || !imageRef.current || !buttonRef.current) return;

    const tl = gsap.timeline();

    // Animate text reveal
    const textElements = textRef.current.querySelectorAll('.hero-eyebrow, .hero-heading, .hero-description');
    if (textElements.length > 0) {
      tl.from(textElements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }

    // Animate image
    gsap.from(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.3,
    });

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1,
    });

    // Animate buttons
    const buttons = buttonRef.current.querySelectorAll('button');
    if (buttons.length > 0) {
      gsap.from(buttons, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.8,
      });
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text" ref={textRef}>
            <p className="hero-eyebrow" data-aos="fade-up">Hotel & Resort Management</p>
            <h1 className="hero-heading">
              <span>Elevated Management</span>
              <span>for Hotels & Resorts</span>
            </h1>
            <p className="hero-description">
              End-to-end property management, operations optimization, and growth strategies
              for luxury hotels and resorts. We transform properties into exceptional
              guest experiences.
            </p>
            <div className="hero-buttons" ref={buttonRef}>
              <button
                className="btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Book a Strategy Call
              </button>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('properties')}
              >
                View Managed Properties
              </button>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image" ref={imageRef}>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80"
                alt="Luxury Hotel"
                loading="eager"
              />
            </div>
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <div className="hero-blob"></div>
      </div>
    </section>
  );
};

export default Hero;

