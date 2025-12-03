import React from 'react';
import './Process.css';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Audit',
      description: 'Comprehensive analysis of your property, operations, and market position to identify opportunities.',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description: 'Custom roadmap development with clear objectives, timelines, and success metrics tailored to your goals.',
    },
    {
      number: '03',
      title: 'On-ground Implementation',
      description: 'Hands-on execution of strategies with our expert team working alongside your staff for seamless integration.',
    },
    {
      number: '04',
      title: 'Performance Tracking',
      description: 'Real-time monitoring and analytics to measure progress and ensure we\'re hitting all targets.',
    },
    {
      number: '05',
      title: 'Continuous Optimization',
      description: 'Ongoing refinement and improvement to adapt to market changes and maximize long-term success.',
    },
  ];

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="process-header" data-aos="fade-up">
          <h2 className="section-title">How We Work With You</h2>
          <p className="section-subtitle">
            A proven methodology that transforms properties into exceptional experiences
          </p>
        </div>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-step"
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={index * 150}
            >
              <div className="process-number">{step.number}</div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="process-connector">
                  <div className="process-line"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

