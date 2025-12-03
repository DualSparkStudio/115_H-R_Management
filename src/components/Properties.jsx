import React, { useState } from 'react';
import './Properties.css';

const Properties = ({ onPropertySelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const properties = [
    {
      id: 1,
      name: 'Oceanview Grand Resort',
      location: 'Maldives',
      tagline: 'Beachfront Luxury • 120 Keys',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
      description: 'Nestled in the pristine waters of the Maldives, Oceanview Grand Resort offers an unparalleled luxury experience with direct beachfront access. This world-class resort combines traditional Maldivian architecture with contemporary design, creating a serene paradise for discerning travelers. Each overwater villa features private pools, direct lagoon access, and breathtaking ocean views that stretch to the horizon.',
      rooms: '120 Keys',
      rating: 5,
      address: 'North Malé Atoll, Maldives',
      nearestAirport: 'Velana International Airport (MLE)',
      distanceFromAirport: '30 minutes by speedboat',
      features: [
        'Overwater villas with private pools',
        '24/7 concierge service',
        'Multiple fine-dining restaurants',
        'World-class spa and wellness center',
        'Water sports and diving center',
        'Kids club and family activities',
        'Private yacht transfers',
        'Underwater restaurant experience'
      ],
      amenities: [
        { icon: '🏊', name: 'Infinity Pool' },
        { icon: '🍽️', name: '5 Restaurants' },
        { icon: '🍸', name: 'Beach Bar' },
        { icon: '💆', name: 'Spa & Wellness' },
        { icon: '🏋️', name: 'Fitness Center' },
        { icon: '🤿', name: 'Diving Center' },
        { icon: '⛵', name: 'Water Sports' },
        { icon: '🎯', name: 'Kids Club' },
        { icon: '🚁', name: 'Helipad' },
        { icon: '🛍️', name: 'Boutique Shop' }
      ],
      attractions: [
        'Dolphin watching tours',
        'Coral reef snorkeling',
        'Sandbank picnics',
        'Sunset cruises',
        'Local island excursions'
      ]
    },
    {
      id: 2,
      name: 'Metropolitan Plaza Hotel',
      location: 'New York, USA',
      tagline: 'Urban Elegance • 200 Rooms',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80',
      category: 'Hotel',
      description: 'Located in the heart of Manhattan, Metropolitan Plaza Hotel represents the pinnacle of urban sophistication. This architectural masterpiece seamlessly blends Art Deco elegance with modern luxury, offering guests an exceptional experience in one of the world\'s most vibrant cities. The hotel\'s prime location provides easy access to Broadway, Central Park, and the city\'s premier shopping and dining destinations.',
      rooms: '200 Rooms',
      rating: 5,
      address: '1235 Broadway, New York, NY 10001, United States',
      nearestAirport: 'John F. Kennedy International Airport (JFK)',
      distanceFromAirport: '45 minutes by car',
      features: [
        'Rooftop bar with city views',
        'State-of-the-art business center',
        'Luxury spa and wellness facilities',
        'Multiple award-winning restaurants',
        'Concierge services',
        'Valet parking',
        '24/7 room service',
        'Pet-friendly accommodations'
      ],
      amenities: [
        { icon: '🏢', name: 'Business Center' },
        { icon: '🍽️', name: '3 Restaurants' },
        { icon: '🍸', name: 'Rooftop Bar' },
        { icon: '💆', name: 'Full-Service Spa' },
        { icon: '🏋️', name: '24/7 Gym' },
        { icon: '📱', name: 'Concierge App' },
        { icon: '🅿️', name: 'Valet Parking' },
        { icon: '🐕', name: 'Pet-Friendly' },
        { icon: '🛒', name: 'Shopping Arcade' },
        { icon: '🎭', name: 'Theater Packages' }
      ],
      attractions: [
        'Times Square (0.5 miles)',
        'Central Park (1 mile)',
        'Broadway Theaters (0.3 miles)',
        'Museum of Modern Art (1.2 miles)',
        'Empire State Building (2 miles)'
      ]
    },
    {
      id: 3,
      name: 'Alpine Boutique Lodge',
      location: 'Switzerland',
      tagline: 'Mountain Retreat • 45 Suites',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80',
      category: 'Boutique',
      description: 'Perched high in the Swiss Alps, Alpine Boutique Lodge offers an intimate escape into nature\'s grandeur. This exclusive mountain retreat combines rustic alpine charm with modern luxury, featuring handcrafted interiors and panoramic views of snow-capped peaks. Whether you\'re seeking adventure on the slopes or tranquility by the fireplace, this boutique property provides an unforgettable alpine experience.',
      rooms: '45 Suites',
      rating: 5,
      address: 'Mountain View Road, Zermatt, Switzerland',
      nearestAirport: 'Zurich Airport (ZRH)',
      distanceFromAirport: '3.5 hours by train or car',
      features: [
        'Mountain-view suites with fireplaces',
        'Private ski-in/ski-out access',
        'Alpine fine-dining restaurant',
        'Wellness center with sauna',
        'Guided mountain excursions',
        'Helicopter landing pad',
        'Wine cellar and tasting room',
        'Library and games room'
      ],
      amenities: [
        { icon: '⛷️', name: 'Ski-in/Ski-out' },
        { icon: '🍽️', name: 'Alpine Restaurant' },
        { icon: '🍷', name: 'Wine Cellar' },
        { icon: '🧖', name: 'Sauna & Spa' },
        { icon: '🔥', name: 'Fireplace Lounges' },
        { icon: '📚', name: 'Library' },
        { icon: '🎮', name: 'Games Room' },
        { icon: '🚁', name: 'Helipad' },
        { icon: '🎿', name: 'Ski Rental' },
        { icon: '🏔️', name: 'Mountain Tours' }
      ],
      attractions: [
        'Matterhorn views',
        'Gornergrat Railway',
        'Glacier Paradise',
        'Alpine hiking trails',
        'Mountain climbing routes'
      ]
    },
    {
      id: 4,
      name: 'Tropical Paradise Resort',
      location: 'Bali, Indonesia',
      tagline: 'Villa Collection • 80 Units',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
      description: 'Immerse yourself in the tropical splendor of Bali at Tropical Paradise Resort, where traditional Balinese architecture meets contemporary luxury. This exclusive villa collection is set amidst lush rice terraces and overlooks pristine beaches, offering guests an authentic Indonesian experience. Each private villa features traditional thatched roofs, infinity pools, and open-air living spaces that blur the line between indoor and outdoor living.',
      rooms: '80 Villas',
      rating: 5,
      address: 'Ubud, Bali, Indonesia',
      nearestAirport: 'Ngurah Rai International Airport (DPS)',
      distanceFromAirport: '90 minutes by car',
      features: [
        'Private villa pools',
        'Traditional Balinese spa',
        'Organic farm-to-table dining',
        'Yoga and meditation pavilions',
        'Cultural immersion programs',
        'Rice terrace tours',
        'Temple visits and ceremonies',
        'Traditional Balinese dance shows'
      ],
      amenities: [
        { icon: '🏊', name: 'Private Pools' },
        { icon: '🍽️', name: 'Farm-to-Table Restaurant' },
        { icon: '🧘', name: 'Yoga Pavilion' },
        { icon: '💆', name: 'Balinese Spa' },
        { icon: '🌾', name: 'Rice Terrace Views' },
        { icon: '🛕', name: 'Temple Access' },
        { icon: '🎭', name: 'Cultural Shows' },
        { icon: '🚲', name: 'Bicycle Rental' },
        { icon: '🌺', name: 'Garden Tours' },
        { icon: '🍃', name: 'Cooking Classes' }
      ],
      attractions: [
        'Tegallalang Rice Terraces',
        'Sacred Monkey Forest',
        'Ubud Art Market',
        'Tirta Empul Temple',
        'Traditional Balinese villages'
      ]
    },
    {
      id: 5,
      name: 'Riverside City Hotel',
      location: 'London, UK',
      tagline: 'Historic Charm • 150 Rooms',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
      category: 'Hotel',
      description: 'Experience timeless elegance at Riverside City Hotel, a historic landmark on the banks of the River Thames. This beautifully restored Victorian building combines period features with modern luxury, offering guests a taste of classic London sophistication. With stunning views of the Thames and proximity to London\'s most iconic landmarks, the hotel provides an ideal base for exploring the capital.',
      rooms: '150 Rooms',
      rating: 4,
      address: 'Thames Embankment, London, UK',
      nearestAirport: 'Heathrow Airport (LHR)',
      distanceFromAirport: '1 hour by car or train',
      features: [
        'River Thames views',
        'Historic architecture',
        'Afternoon tea service',
        'Traditional British pub',
        'Business and event facilities',
        'Riverside terrace dining',
        'Concierge services',
        'Historic building tours'
      ],
      amenities: [
        { icon: '🌊', name: 'River Views' },
        { icon: '🍽️', name: 'British Restaurant' },
        { icon: '🍵', name: 'Afternoon Tea' },
        { icon: '🍺', name: 'Traditional Pub' },
        { icon: '🏛️', name: 'Historic Tours' },
        { icon: '💼', name: 'Business Center' },
        { icon: '🎉', name: 'Event Spaces' },
        { icon: '🚇', name: 'Tube Station Nearby' },
        { icon: '🚢', name: 'River Cruises' },
        { icon: '📚', name: 'Library Lounge' }
      ],
      attractions: [
        'Big Ben (0.5 miles)',
        'London Eye (0.3 miles)',
        'Westminster Abbey (0.6 miles)',
        'Tate Modern (1 mile)',
        'Shakespeare\'s Globe (0.8 miles)'
      ]
    },
    {
      id: 6,
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      tagline: 'Luxury Desert • 100 Villas',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
      category: 'Resort',
      description: 'Discover the magic of the Arabian desert at Desert Oasis Resort, where luxury meets adventure in the heart of Dubai\'s golden dunes. This exclusive desert retreat offers a unique blend of traditional Bedouin hospitality and modern opulence. Each private villa features panoramic desert views, private pools, and authentic Arabian design elements, creating an unforgettable escape from the city.',
      rooms: '100 Villas',
      rating: 5,
      address: 'Desert Conservation Reserve, Dubai, UAE',
      nearestAirport: 'Dubai International Airport (DXB)',
      distanceFromAirport: '45 minutes by car',
      features: [
        'Private desert villas with pools',
        'Camel trekking experiences',
        'Traditional Arabian dining',
        'Desert safari adventures',
        'Stargazing observatory',
        'Falconry experiences',
        'Traditional souk and shopping',
        'Desert conservation programs'
      ],
      amenities: [
        { icon: '🏜️', name: 'Desert Views' },
        { icon: '🍽️', name: 'Arabian Restaurant' },
        { icon: '🐪', name: 'Camel Trekking' },
        { icon: '🚙', name: 'Desert Safaris' },
        { icon: '⭐', name: 'Stargazing' },
        { icon: '🦅', name: 'Falconry' },
        { icon: '🏊', name: 'Private Pools' },
        { icon: '🛍️', name: 'Desert Souk' },
        { icon: '🔥', name: 'Desert Campfires' },
        { icon: '🎭', name: 'Cultural Shows' }
      ],
      attractions: [
        'Desert dune bashing',
        'Hot air balloon rides',
        'Traditional Bedouin camps',
        'Desert wildlife watching',
        'Sandboarding adventures'
      ]
    }
  ];

  const filters = ['All', 'Hotels', 'Resorts', 'Boutique'];

  const filteredProperties =
    activeFilter === 'All'
      ? properties
      : properties.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  const handlePropertyClick = (property) => {
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

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
                onClick={() => handlePropertyClick(property)}
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
