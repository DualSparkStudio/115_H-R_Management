import React, { useEffect } from 'react';
import './PropertyDetail.css';

const PropertyDetail = ({ property, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!property) return null;

  return (
    <div className="property-detail-overlay" onClick={onClose}>
      <div className="property-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="property-detail-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="property-detail-content">
          <div className="property-detail-hero">
            <div className="property-detail-image-wrapper">
              <img src={property.image} alt={property.name} className="property-detail-image" />
              <div className="property-detail-badge">{property.category}</div>
            </div>
          </div>

          <div className="property-detail-body">
            <div className="property-detail-header">
              <h1 className="property-detail-title">{property.name}</h1>
              <p className="property-detail-location">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {property.location}
              </p>
            </div>

            <div className="property-detail-tagline">
              {property.tagline}
            </div>

            <div className="property-detail-description">
              <h3>About</h3>
              <p>{property.description}</p>
            </div>

            <div className="property-detail-info-grid">
              <div className="property-detail-info-item">
                <div className="info-item-icon">🏨</div>
                <div className="info-item-content">
                  <span className="info-item-label">Property Type</span>
                  <span className="info-item-value">{property.category}</span>
                </div>
              </div>
              <div className="property-detail-info-item">
                <div className="info-item-icon">🛏️</div>
                <div className="info-item-content">
                  <span className="info-item-label">Total Rooms</span>
                  <span className="info-item-value">{property.rooms}</span>
                </div>
              </div>
              <div className="property-detail-info-item">
                <div className="info-item-icon">⭐</div>
                <div className="info-item-content">
                  <span className="info-item-label">Star Rating</span>
                  <span className="info-item-value">{property.rating} Stars</span>
                </div>
              </div>
              <div className="property-detail-info-item">
                <div className="info-item-icon">📍</div>
                <div className="info-item-content">
                  <span className="info-item-label">Address</span>
                  <span className="info-item-value">{property.address}</span>
                </div>
              </div>
            </div>

            <div className="property-detail-section">
              <h3>Key Features</h3>
              <div className="property-detail-features">
                {property.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="property-detail-section">
              <h3>Amenities</h3>
              <div className="property-detail-amenities">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span className="amenity-name">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="property-detail-section">
              <h3>Location Details</h3>
              <div className="property-detail-location-info">
                <p><strong>Full Address:</strong> {property.address}</p>
                {property.nearestAirport && (
                  <p><strong>Nearest Airport:</strong> {property.nearestAirport}</p>
                )}
                {property.distanceFromAirport && (
                  <p><strong>Distance from Airport:</strong> {property.distanceFromAirport}</p>
                )}
                {property.attractions && property.attractions.length > 0 && (
                  <div className="nearby-attractions">
                    <p><strong>Nearby Attractions:</strong></p>
                    <ul>
                      {property.attractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="property-detail-actions">
              <a
                href={`mailto:hello@luxestay.com?subject=Inquiry about ${property.name}`}
                className="property-detail-button primary"
              >
                Contact Us
              </a>
              <button
                className="property-detail-button secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

