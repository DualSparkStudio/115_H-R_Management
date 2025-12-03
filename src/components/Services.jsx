import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '🏨',
      title: 'Hotel Operations Management',
      description: 'Complete day-to-day operations oversight, staff management, and quality assurance to ensure seamless guest experiences.',
    },
    {
      icon: '🏖️',
      title: 'Resort Experience Design',
      description: 'Curate exceptional guest journeys from arrival to departure, creating memorable moments that drive loyalty.',
    },
    {
      icon: '📈',
      title: 'Revenue & Occupancy Optimization',
      description: 'Data-driven pricing strategies, channel management, and marketing campaigns to maximize profitability.',
    },
    {
      icon: '👥',
      title: 'Staff Training & SOPs',
      description: 'Comprehensive training programs and standard operating procedures to elevate service standards consistently.',
    },
    {
      icon: '🚀',
      title: 'Pre-opening Consulting',
      description: 'Expert guidance from concept to launch, ensuring your property opens with excellence from day one.',
    },
    {
      icon: '✨',
      title: 'Brand Positioning & Marketing',
      description: 'Strategic brand development and multi-channel marketing to attract your ideal guests and build reputation.',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header" data-aos="fade-up">
          <h2 className="section-title">What We Manage</h2>
          <p className="section-subtitle">
            Comprehensive management solutions tailored to elevate your property's performance
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

