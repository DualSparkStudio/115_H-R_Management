import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Default/Initial data
const defaultData = {
  hero: {
    eyebrow: 'Hotel & Resort Management',
    heading1: 'Elevated Management',
    heading2: 'for Hotels & Resorts',
    description: 'End-to-end property management, operations optimization, and growth strategies for luxury hotels and resorts. We transform properties into exceptional guest experiences.',
    button1: 'Book a Strategy Call',
    button2: 'View Managed Properties',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80'
  },
  services: [
    {
      id: 1,
      icon: '🏨',
      title: 'Hotel Operations Management',
      description: 'Complete day-to-day operations oversight, staff management, and quality assurance to ensure seamless guest experiences.',
    },
    {
      id: 2,
      icon: '🏖️',
      title: 'Resort Experience Design',
      description: 'Curate exceptional guest journeys from arrival to departure, creating memorable moments that drive loyalty.',
    },
    {
      id: 3,
      icon: '📈',
      title: 'Revenue & Occupancy Optimization',
      description: 'Data-driven pricing strategies, channel management, and marketing campaigns to maximize profitability.',
    },
    {
      id: 4,
      icon: '👥',
      title: 'Staff Training & SOPs',
      description: 'Comprehensive training programs and standard operating procedures to elevate service standards consistently.',
    },
    {
      id: 5,
      icon: '🚀',
      title: 'Pre-opening Consulting',
      description: 'Expert guidance from concept to launch, ensuring your property opens with excellence from day one.',
    },
    {
      id: 6,
      icon: '✨',
      title: 'Brand Positioning & Marketing',
      description: 'Strategic brand development and multi-channel marketing to attract your ideal guests and build reputation.',
    },
  ],
  properties: [
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
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: 'LuxeStay transformed our resort from struggling to thriving. Their strategic approach and hands-on management increased our occupancy by 45% in just 8 months.',
      name: 'Sarah Chen',
      role: 'Property Owner',
      property: 'Oceanview Grand Resort',
    },
    {
      id: 2,
      quote: 'The team\'s expertise in operations and guest experience is unmatched. We\'ve seen consistent improvements in guest satisfaction scores and revenue.',
      name: 'Michael Rodriguez',
      role: 'General Manager',
      property: 'Metropolitan Plaza Hotel',
    },
    {
      id: 3,
      quote: 'Working with LuxeStay was a game-changer. They understood our vision and executed flawlessly, helping us open our boutique property with excellence from day one.',
      name: 'Emma Thompson',
      role: 'Founder & Owner',
      property: 'Alpine Boutique Lodge',
    },
  ],
  contact: {
    email: 'hello@luxestay.com',
    phone: '+1 (234) 567-8900',
    serviceRegion: 'Global'
  },
  footer: {
    logo: 'LuxeStay Management',
    about: 'Transforming hotels and resorts into exceptional guest experiences through strategic management and operational excellence.'
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('luxestay-data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    // Check if user is logged in
    const adminSession = localStorage.getItem('luxestay-admin');
    if (adminSession) {
      setIsAdmin(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('luxestay-data', JSON.stringify(data));
  }, [data]);

  const updateData = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const updateItem = (section, itemId, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    }));
  };

  const addItem = (section, newItem) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  };

  const deleteItem = (section, itemId) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== itemId)
    }));
  };

  const login = (password) => {
    // Simple password check - change this password
    const adminPassword = 'admin123'; // Change this to your desired password
    if (password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('luxestay-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('luxestay-admin');
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.setItem('luxestay-data', JSON.stringify(defaultData));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isAdmin,
        updateData,
        updateItem,
        addItem,
        deleteItem,
        login,
        logout,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

