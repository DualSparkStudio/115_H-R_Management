import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Properties from './components/Properties';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PropertyDetailPage from './components/PropertyDetailPage';
import Cursor from './components/Cursor';
import './App.css';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // Initialize Lenis Smooth Scroll
    let lenis;
    let rafId;
    
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      console.warn('Lenis initialization failed, using default scroll:', error);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleBackToProperties = () => {
    setSelectedProperty(null);
    // Scroll to properties section when going back
    setTimeout(() => {
      const propertiesSection = document.getElementById('properties');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Show property detail page if a property is selected
  if (selectedProperty) {
    return (
      <div className="App">
        <Cursor />
        <Navbar />
        <PropertyDetailPage property={selectedProperty} onBack={handleBackToProperties} />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Show main page
  return (
    <div className="App">
      <Cursor />
      <Navbar />
      <Hero />
      <Services />
      <Properties onPropertySelect={handlePropertySelect} />
      <Process />
      <Testimonials />
      <CTASection />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;

