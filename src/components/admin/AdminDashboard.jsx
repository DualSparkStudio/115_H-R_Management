import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { data, logout, updateData, updateItem, addItem, deleteItem } = useData();
  const [activeTab, setActiveTab] = useState('hero');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2 className="admin-logo">LuxeStay Admin</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            <span>🏠</span> Hero Section
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <span>⚙️</span> Services
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <span>🏨</span> Properties
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <span>💬</span> Testimonials
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span>📧</span> Contact Info
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-logout-button" onClick={handleLogout}>
            Logout
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-view-site">
            View Site
          </a>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-content-header">
          <h1 className="admin-page-title">
            {activeTab === 'hero' && 'Hero Section'}
            {activeTab === 'services' && 'Services'}
            {activeTab === 'properties' && 'Properties'}
            {activeTab === 'testimonials' && 'Testimonials'}
            {activeTab === 'contact' && 'Contact Information'}
          </h1>
          <p className="admin-page-subtitle">Manage your website content</p>
        </div>

        <div className="admin-content-body">
          {activeTab === 'hero' && <HeroEditor data={data.hero} updateData={updateData} />}
          {activeTab === 'services' && (
            <ServicesEditor
              services={data.services}
              updateItem={updateItem}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          )}
          {activeTab === 'properties' && (
            <PropertiesEditor
              properties={data.properties}
              updateItem={updateItem}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsEditor
              testimonials={data.testimonials}
              updateItem={updateItem}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          )}
          {activeTab === 'contact' && (
            <ContactEditor data={data.contact} updateData={updateData} />
          )}
        </div>
      </div>
    </div>
  );
};

// Hero Editor Component
const HeroEditor = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateData('hero', updated);
  };

  return (
    <div className="admin-editor-card">
      <h3 className="admin-editor-title">Hero Section Content</h3>
      <div className="admin-form-grid">
        <div className="admin-form-field">
          <label>Eyebrow Text</label>
          <input
            type="text"
            value={formData.eyebrow}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
          />
        </div>
        <div className="admin-form-field">
          <label>Heading Line 1</label>
          <input
            type="text"
            value={formData.heading1}
            onChange={(e) => handleChange('heading1', e.target.value)}
          />
        </div>
        <div className="admin-form-field">
          <label>Heading Line 2</label>
          <input
            type="text"
            value={formData.heading2}
            onChange={(e) => handleChange('heading2', e.target.value)}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows="4"
          />
        </div>
        <div className="admin-form-field">
          <label>Button 1 Text</label>
          <input
            type="text"
            value={formData.button1}
            onChange={(e) => handleChange('button1', e.target.value)}
          />
        </div>
        <div className="admin-form-field">
          <label>Button 2 Text</label>
          <input
            type="text"
            value={formData.button2}
            onChange={(e) => handleChange('button2', e.target.value)}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Hero Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// Services Editor Component
const ServicesEditor = ({ services, updateItem, addItem, deleteItem }) => {
  const [editingId, setEditingId] = useState(null);

  const handleSave = (id, updatedService) => {
    updateItem('services', id, updatedService);
    setEditingId(null);
  };

  const handleAdd = () => {
    const newService = {
      icon: '✨',
      title: 'New Service',
      description: 'Service description'
    };
    addItem('services', newService);
  };

  return (
    <div className="admin-editor-list">
      <div className="admin-list-header">
        <h3 className="admin-editor-title">Services</h3>
        <button className="admin-add-button" onClick={handleAdd}>
          + Add Service
        </button>
      </div>
      {services.map((service) => (
        <ServiceItemEditor
          key={service.id}
          service={service}
          isEditing={editingId === service.id}
          onEdit={() => setEditingId(service.id)}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
};

const ServiceItemEditor = ({ service, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState(service);

  React.useEffect(() => {
    setFormData(service);
  }, [service]);

  if (!isEditing) {
    return (
      <div className="admin-list-item">
        <div className="admin-list-item-content">
          <span className="admin-item-icon">{service.icon}</span>
          <div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        </div>
        <div className="admin-list-item-actions">
          <button onClick={onEdit} className="admin-edit-button">Edit</button>
          <button
            onClick={() => {
              if (window.confirm('Delete this service?')) {
                onDelete('services', service.id);
              }
            }}
            className="admin-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-list-item editing">
      <div className="admin-form-grid">
        <div className="admin-form-field">
          <label>Icon (emoji)</label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
        </div>
      </div>
      <div className="admin-form-actions">
        <button
          onClick={() => onSave(service.id, formData)}
          className="admin-save-button"
        >
          Save
        </button>
        <button onClick={onCancel} className="admin-cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

// Properties Editor Component
const PropertiesEditor = ({ properties, updateItem, addItem, deleteItem }) => {
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const newProperty = {
      name: 'New Property',
      location: 'Location',
      tagline: 'Tagline',
      image: 'https://via.placeholder.com/800x600',
      category: 'Hotel',
      description: 'Description',
      rooms: '100 Rooms',
      rating: 5,
      address: 'Address',
      nearestAirport: '',
      distanceFromAirport: '',
      features: [],
      amenities: [],
      attractions: []
    };
    addItem('properties', newProperty);
  };

  return (
    <div className="admin-editor-list">
      <div className="admin-list-header">
        <h3 className="admin-editor-title">Properties</h3>
        <button className="admin-add-button" onClick={handleAdd}>
          + Add Property
        </button>
      </div>
      {properties.map((property) => (
        <PropertyItemEditor
          key={property.id}
          property={property}
          isEditing={editingId === property.id}
          onEdit={() => setEditingId(property.id)}
          onSave={(id, data) => {
            updateItem('properties', id, data);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
};

const PropertyItemEditor = ({ property, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState(property);

  React.useEffect(() => {
    setFormData(property);
  }, [property]);

  if (!isEditing) {
    return (
      <div className="admin-list-item">
        <div className="admin-list-item-content">
          <img src={property.image} alt={property.name} className="admin-item-image" />
          <div>
            <h4>{property.name}</h4>
            <p>{property.location} • {property.category}</p>
          </div>
        </div>
        <div className="admin-list-item-actions">
          <button onClick={onEdit} className="admin-edit-button">Edit</button>
          <button
            onClick={() => {
              if (window.confirm('Delete this property?')) {
                onDelete('properties', property.id);
              }
            }}
            className="admin-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-list-item editing">
      <div className="admin-form-grid">
        <div className="admin-form-field">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="admin-form-field">
          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div className="admin-form-field">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Hotel">Hotel</option>
            <option value="Resort">Resort</option>
            <option value="Boutique">Boutique</option>
          </select>
        </div>
        <div className="admin-form-field">
          <label>Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
          />
        </div>
        <div className="admin-form-field">
          <label>Rooms</label>
          <input
            type="text"
            value={formData.rooms}
            onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
          />
        </div>
        <div className="admin-form-field">
          <label>Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          />
        </div>
        <div className="admin-form-field full-width">
          <label>Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>
      <div className="admin-form-actions">
        <button
          onClick={() => onSave(property.id, formData)}
          className="admin-save-button"
        >
          Save
        </button>
        <button onClick={onCancel} className="admin-cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

// Testimonials Editor Component
const TestimonialsEditor = ({ testimonials, updateItem, addItem, deleteItem }) => {
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const newTestimonial = {
      quote: 'Testimonial quote',
      name: 'Name',
      role: 'Role',
      property: 'Property Name'
    };
    addItem('testimonials', newTestimonial);
  };

  return (
    <div className="admin-editor-list">
      <div className="admin-list-header">
        <h3 className="admin-editor-title">Testimonials</h3>
        <button className="admin-add-button" onClick={handleAdd}>
          + Add Testimonial
        </button>
      </div>
      {testimonials.map((testimonial) => (
        <TestimonialItemEditor
          key={testimonial.id}
          testimonial={testimonial}
          isEditing={editingId === testimonial.id}
          onEdit={() => setEditingId(testimonial.id)}
          onSave={(id, data) => {
            updateItem('testimonials', id, data);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
};

const TestimonialItemEditor = ({ testimonial, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState(testimonial);

  React.useEffect(() => {
    setFormData(testimonial);
  }, [testimonial]);

  if (!isEditing) {
    return (
      <div className="admin-list-item">
        <div className="admin-list-item-content">
          <div>
            <p className="admin-item-quote">"{testimonial.quote}"</p>
            <h4>{testimonial.name}</h4>
            <p>{testimonial.role} • {testimonial.property}</p>
          </div>
        </div>
        <div className="admin-list-item-actions">
          <button onClick={onEdit} className="admin-edit-button">Edit</button>
          <button
            onClick={() => {
              if (window.confirm('Delete this testimonial?')) {
                onDelete('testimonials', testimonial.id);
              }
            }}
            className="admin-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-list-item editing">
      <div className="admin-form-grid">
        <div className="admin-form-field full-width">
          <label>Quote</label>
          <textarea
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            rows="4"
          />
        </div>
        <div className="admin-form-field">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="admin-form-field">
          <label>Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>
        <div className="admin-form-field">
          <label>Property</label>
          <input
            type="text"
            value={formData.property}
            onChange={(e) => setFormData({ ...formData, property: e.target.value })}
          />
        </div>
      </div>
      <div className="admin-form-actions">
        <button
          onClick={() => onSave(testimonial.id, formData)}
          className="admin-save-button"
        >
          Save
        </button>
        <button onClick={onCancel} className="admin-cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

// Contact Editor Component
const ContactEditor = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateData('contact', updated);
  };

  return (
    <div className="admin-editor-card">
      <h3 className="admin-editor-title">Contact Information</h3>
      <div className="admin-form-grid">
        <div className="admin-form-field">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="admin-form-field">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="admin-form-field">
          <label>Service Region</label>
          <input
            type="text"
            value={formData.serviceRegion}
            onChange={(e) => handleChange('serviceRegion', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

