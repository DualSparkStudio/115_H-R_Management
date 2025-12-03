import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Here you would typically send the form data to a backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: '',
          location: '',
          message: '',
        });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header" data-aos="fade-up">
          <h2 className="section-title">Let's Talk About Your Property</h2>
          <p className="section-subtitle">
            Get in touch to discuss how we can help elevate your hotel or resort
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-form-wrapper" data-aos="fade-up" data-aos-delay="100">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={`form-input form-select ${errors.propertyType ? 'error' : ''}`}
                >
                  <option value="">Select Property Type *</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="boutique">Boutique</option>
                  <option value="chain">Chain</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="propertyType" className="form-label">
                  Property Type *
                </label>
                {errors.propertyType && (
                  <span className="error-message">{errors.propertyType}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder=" "
                />
                <label htmlFor="location" className="form-label">
                  Property Location *
                </label>
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder=" "
                  rows="5"
                />
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="form-submit">
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info" data-aos="fade-up" data-aos-delay="200">
            <div className="info-card">
              <h3 className="info-title">Get in Touch</h3>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <p className="info-label">Email</p>
                  <a href="mailto:hello@luxestay.com" className="info-value">
                    hello@luxestay.com
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <p className="info-label">Phone</p>
                  <a href="tel:+1234567890" className="info-value">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🌍</div>
                <div>
                  <p className="info-label">Service Region</p>
                  <p className="info-value">Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

