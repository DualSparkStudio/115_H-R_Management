import React, { useState } from 'react';
import './Properties.css';

const Properties = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const properties = [
    {
      id: 1,
      name: 'Oceanview Grand Resort',
      location: 'Maldives',
      tagline: 'Beachfront Luxury • 120 Keys',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
    },
    {
      id: 2,
      name: 'Metropolitan Plaza Hotel',
      location: 'New York, USA',
      tagline: 'Urban Elegance • 200 Rooms',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80',
      category: 'Hotel',
    },
    {
      id: 3,
      name: 'Alpine Boutique Lodge',
      location: 'Switzerland',
      tagline: 'Mountain Retreat • 45 Suites',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80',
      category: 'Boutique',
    },
    {
      id: 4,
      name: 'Tropical Paradise Resort',
      location: 'Bali, Indonesia',
      tagline: 'Villa Collection • 80 Units',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
    },
    {
      id: 5,
      name: 'Riverside City Hotel',
      location: 'London, UK',
      tagline: 'Historic Charm • 150 Rooms',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
      category: 'Hotel',
    },
    {
      id: 6,
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      tagline: 'Luxury Desert • 100 Villas',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
    },
  ];

  const filters = ['All', 'Hotels', 'Resorts', 'Boutique'];

  const filteredProperties =
    activeFilter === 'All'
      ? properties
      : properties.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="properties" className="properties">
      <div className="container">
        <div className="properties-header" data-aos="fade-up">
          <h2 className="section-title">Featured Hotels & Resorts</h2>
          <p className="section-subtitle">
            A diverse portfolio of properties we've transformed into exceptional guest experiences
          </p>
        </div>
        <div className="properties-filters" data-aos="fade-up" data-aos-delay="100">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="properties-grid">
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="property-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="property-image-wrapper">
                <img
                  src={property.image}
                  alt={property.name}
                  className="property-image"
                  loading="lazy"
                />
                <div className="property-overlay">
                  <button className="property-button">View Details</button>
                </div>
              </div>
              <div className="property-info">
                <h3 className="property-name">{property.name}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-tagline">{property.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;

