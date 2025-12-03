import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">LuxeStay Management</h3>
            <p className="footer-about">
              Transforming hotels and resorts into exceptional guest experiences through
              strategic management and operational excellence.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Services
                </a>
              </li>
              <li>
                <a href="#properties" onClick={(e) => { e.preventDefault(); scrollToSection('properties'); }}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>
                  Process
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} LuxeStay Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

