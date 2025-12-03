import React, { useState, useEffect } from 'react';
import { getBookings } from '../../utils/bookingStorage';
import './AdminDashboardHome.css';

const AdminDashboardHome = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    thisMonthBookings: 0,
    thisMonthRevenue: 0
  });

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const allBookings = getBookings();
    setBookings(allBookings);

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const statsData = {
      totalBookings: allBookings.length,
      pendingBookings: allBookings.filter(b => b.status === 'pending').length,
      confirmedBookings: allBookings.filter(b => b.status === 'confirmed').length,
      totalRevenue: allBookings.reduce((sum, b) => sum + (parseFloat(b.total) || 0), 0),
      thisMonthBookings: allBookings.filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate >= thisMonthStart && bookingDate <= now;
      }).length,
      thisMonthRevenue: allBookings
        .filter(b => {
          const bookingDate = new Date(b.createdAt);
          return bookingDate >= thisMonthStart && bookingDate <= now;
        })
        .reduce((sum, b) => sum + (parseFloat(b.total) || 0), 0)
    };

    setStats(statsData);
  };

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="admin-dashboard-home">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalBookings}</h3>
            <p className="stat-label">Total Bookings</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.pendingBookings}</h3>
            <p className="stat-label">Pending</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.confirmedBookings}</h3>
            <p className="stat-label">Confirmed</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3 className="stat-value">₹{stats.totalRevenue.toLocaleString()}</h3>
            <p className="stat-label">Total Revenue</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.thisMonthBookings}</h3>
            <p className="stat-label">This Month</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <h3 className="stat-value">₹{stats.thisMonthRevenue.toLocaleString()}</h3>
            <p className="stat-label">This Month Revenue</p>
          </div>
        </div>
      </div>

      <div className="admin-recent-bookings">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Recent Bookings</h2>
          <a href="#bookings" className="admin-view-all-link">View All →</a>
        </div>
        {recentBookings.length === 0 ? (
          <div className="admin-empty-state">
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="admin-bookings-list">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="admin-booking-item">
                <div className="booking-item-info">
                  <h4>{booking.propertyName}</h4>
                  <p>
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p className="booking-guest-info">
                    {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'} • {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
                  </p>
                </div>
                <div className="booking-item-status">
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                  <p className="booking-amount">₹{parseFloat(booking.total).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;

