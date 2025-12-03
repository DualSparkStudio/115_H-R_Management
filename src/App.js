import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import { DataProvider } from './context/DataContext';
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
import AdminPanel from './components/admin/AdminPanel';
import Cursor from './components/Cursor';
import './App.css';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check if user wants to access admin panel
    const checkAdminAccess = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      if (hash === '#admin' || pathname === '/admin') {
        setShowAdmin(true);
        window.history.replaceState(null, '', window.location.pathname + '#admin');
      } else {
        setShowAdmin(false);
      }
    };

    checkAdminAccess();
    window.addEventListener('hashchange', checkAdminAccess);
    return () => window.removeEventListener('hashchange', checkAdminAccess);
  }, []);

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

  return (
    <DataProvider>
      {showAdmin ? (
        <AdminPanel />
      ) : (
        <>
          {selectedProperty ? (
            <div className="App">
              <Cursor />
              <Navbar />
              <PropertyDetailPage property={selectedProperty} onBack={handleBackToProperties} />
              <Footer />
              <WhatsAppButton />
            </div>
          ) : (
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
          )}
        </>
      )}
    </DataProvider>
  );
}

export default App;

