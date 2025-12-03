import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl } from '../config/whatsapp';
import BookingCalendar from './BookingCalendar';
import './PropertyDetailPage.css';

const PropertyDetailPage = ({ property, onBack }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const pricePerPerson = 1000; // Rs per person

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleDateSelect = (type, date) => {
    if (type === 'checkin') {
      setCheckInDate(date);
      // If check-out is before new check-in, clear it
      if (checkOutDate && date >= checkOutDate) {
        setCheckOutDate(null);
      }
    } else {
      setCheckOutDate(date);
    }
  };

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return numberOfGuests * pricePerPerson * days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) return;

    const bookingDetails = {
      property: property.name,
      checkIn: formatDate(checkInDate),
      checkOut: formatDate(checkOutDate),
      guests: numberOfGuests,
      nights: calculateDays(),
      total: calculateTotal()
    };

    // Create booking message for WhatsApp or email
    const bookingMessage = `I would like to book ${property.name}%0A%0A` +
      `Check-in: ${formatDate(checkInDate)}%0A` +
      `Check-out: ${formatDate(checkOutDate)}%0A` +
      `Number of Guests: ${numberOfGuests}%0A` +
      `Number of Nights: ${calculateDays()}%0A` +
      `Total Amount: ₹${calculateTotal().toLocaleString()}`;

    const whatsappUrl = getWhatsAppUrl(bookingMessage);
    
    // Open WhatsApp with booking details
    window.open(whatsappUrl, '_blank');
  };

  if (!property) return null;

  return (
    <div className="property-detail-page">
      {/* Hero Section */}
      <div className="property-detail-hero-section">
        <div className="property-detail-hero-image">
          <img src={property.image} alt={property.name} />
          <div className="property-detail-hero-overlay"></div>
        </div>
        <div className="property-detail-hero-content">
          <div className="container">
            <button className="property-detail-back-button" onClick={onBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Properties
            </button>
            <div className="property-detail-hero-badge">{property.category}</div>
            <h1 className="property-detail-hero-title">{property.name}</h1>
            <div className="property-detail-hero-location">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{property.location}</span>
            </div>
            <p className="property-detail-hero-tagline">{property.tagline}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="property-detail-main">
        <div className="container">
          {/* Quick Info Cards */}
          <div className="property-detail-quick-info">
            <div className="quick-info-card">
              <div className="quick-info-icon">🏨</div>
              <div className="quick-info-content">
                <span className="quick-info-label">Property Type</span>
                <span className="quick-info-value">{property.category}</span>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon">🛏️</div>
              <div className="quick-info-content">
                <span className="quick-info-label">Total Rooms</span>
                <span className="quick-info-value">{property.rooms}</span>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon">⭐</div>
              <div className="quick-info-content">
                <span className="quick-info-label">Star Rating</span>
                <span className="quick-info-value">{property.rating} Stars</span>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon">📍</div>
              <div className="quick-info-content">
                <span className="quick-info-label">Location</span>
                <span className="quick-info-value">{property.location}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="property-detail-section">
            <h2 className="property-detail-section-title">About</h2>
            <p className="property-detail-description">{property.description}</p>
          </section>

          {/* Key Features */}
          <section className="property-detail-section">
            <h2 className="property-detail-section-title">Key Features</h2>
            <div className="property-detail-features-grid">
              {property.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="property-detail-section">
            <h2 className="property-detail-section-title">Amenities & Services</h2>
            <div className="property-detail-amenities-grid">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="amenity-card">
                  <div className="amenity-icon">{amenity.icon}</div>
                  <span className="amenity-name">{amenity.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Location Details */}
          <section className="property-detail-section">
            <h2 className="property-detail-section-title">Location & Transportation</h2>
            <div className="property-detail-location-card">
              <div className="location-detail-item">
                <strong>Full Address:</strong>
                <p>{property.address}</p>
              </div>
              {property.nearestAirport && (
                <div className="location-detail-item">
                  <strong>Nearest Airport:</strong>
                  <p>{property.nearestAirport}</p>
                </div>
              )}
              {property.distanceFromAirport && (
                <div className="location-detail-item">
                  <strong>Distance from Airport:</strong>
                  <p>{property.distanceFromAirport}</p>
                </div>
              )}
              {property.attractions && property.attractions.length > 0 && (
                <div className="location-detail-item">
                  <strong>Nearby Attractions:</strong>
                  <ul className="attractions-list">
                    {property.attractions.map((attraction, index) => (
                      <li key={index}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Booking Section */}
          <section className="property-detail-booking">
            <h2 className="property-detail-section-title">Book Your Stay</h2>
            <div className="booking-container">
              <div className="booking-calendar-wrapper">
                <BookingCalendar
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
              <div className="booking-form-wrapper">
                <div className="booking-form">
                  <div className="booking-date-inputs">
                    <div className="booking-date-input">
                      <label>Check-in Date</label>
                      <input
                        type="text"
                        value={formatDate(checkInDate)}
                        placeholder="Select check-in date"
                        readOnly
                        className={checkInDate ? 'has-value' : ''}
                      />
                    </div>
                    <div className="booking-date-input">
                      <label>Check-out Date</label>
                      <input
                        type="text"
                        value={formatDate(checkOutDate)}
                        placeholder="Select check-out date"
                        readOnly
                        className={checkOutDate ? 'has-value' : ''}
                      />
                    </div>
                  </div>

                  <div className="booking-guests">
                    <label>Number of Guests</label>
                    <div className="guests-selector">
                      <button
                        type="button"
                        className="guests-button"
                        onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="guests-count">{numberOfGuests}</span>
                      <button
                        type="button"
                        className="guests-button"
                        onClick={() => setNumberOfGuests(numberOfGuests + 1)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="booking-summary">
                    <div className="booking-summary-row">
                      <span>Price per person per night:</span>
                      <span className="booking-price">₹{pricePerPerson.toLocaleString()}</span>
                    </div>
                    {checkInDate && checkOutDate && (
                      <>
                        <div className="booking-summary-row">
                          <span>Number of nights:</span>
                          <span>{calculateDays()} {calculateDays() === 1 ? 'night' : 'nights'}</span>
                        </div>
                        <div className="booking-summary-row">
                          <span>Number of guests:</span>
                          <span>{numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'}</span>
                        </div>
                        <div className="booking-summary-divider"></div>
                        <div className="booking-summary-row total">
                          <span>Total Amount:</span>
                          <span className="booking-total">₹{calculateTotal().toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    className="booking-button"
                    disabled={!checkInDate || !checkOutDate}
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="property-detail-cta">
            <div className="property-detail-cta-content">
              <h2 className="property-detail-cta-title">Interested in This Property?</h2>
              <p className="property-detail-cta-text">
                Contact us to learn more about our management services and how we can help elevate your property.
              </p>
              <div className="property-detail-cta-buttons">
                <a
                  href={`mailto:hello@luxestay.com?subject=Inquiry about ${property.name}`}
                  className="property-detail-cta-button primary"
                >
                  Get in Touch
                </a>
                <a
                  href={getWhatsAppUrl(`I'm interested in learning more about ${property.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="property-detail-cta-button secondary"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;


