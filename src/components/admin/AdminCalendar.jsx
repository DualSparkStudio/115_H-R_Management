import React, { useState, useEffect } from 'react';
import {
  getBlockedDates,
  blockDate,
  unblockDate,
  isDateBlocked,
  getBookings,
  getBookingsForDateRange
} from '../../utils/bookingStorage';
import './AdminCalendar.css';

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blockReason, setBlockReason] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadData();
  }, [currentMonth]);

  const loadData = () => {
    setBlockedDates(getBlockedDates());
    setBookings(getBookings());
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = formatDate(clickedDate);
    
    setSelectedDate(dateStr);
    
    const blocked = isDateBlocked(dateStr);
    if (blocked) {
      const blockedInfo = blockedDates.find(d => d.date === dateStr);
      setBlockReason(blockedInfo?.reason || '');
    } else {
      setBlockReason('');
    }
  };

  const handleToggleBlock = () => {
    if (!selectedDate) return;

    if (isDateBlocked(selectedDate)) {
      if (unblockDate(selectedDate)) {
        loadData();
        setBlockReason('');
      }
    } else {
      if (blockDate(selectedDate, blockReason)) {
        loadData();
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const getDateInfo = (day) => {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);
    const blocked = isDateBlocked(dateStr);
    const dateBookings = bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date <= checkOut;
    });
    
    return { blocked, bookings: dateBookings, dateStr };
  };

  return (
    <div className="admin-calendar-page">
      <div className="admin-calendar-container">
        <div className="admin-calendar-main">
          <div className="admin-calendar-header">
            <button className="calendar-nav-button" onClick={handlePrevMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="calendar-month-year">
              {months[month]} {year}
            </h2>
            <button className="calendar-nav-button" onClick={handleNextMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="admin-calendar-weekdays">
            {days.map((day) => (
              <div key={day} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="admin-calendar-days">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(year, month, day);
              const { blocked, bookings: dateBookings, dateStr } = getDateInfo(day);
              const isSelected = selectedDate === dateStr;
              const isPast = date < new Date().setHours(0, 0, 0, 0);

              return (
                <div
                  key={day}
                  className={`admin-calendar-day ${blocked ? 'blocked' : ''} ${dateBookings.length > 0 ? 'has-booking' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => !isPast && handleDateClick(day)}
                  title={blocked ? `Blocked: ${blockedDates.find(d => d.date === dateStr)?.reason || ''}` : dateBookings.length > 0 ? `${dateBookings.length} booking(s)` : ''}
                >
                  <span className="day-number">{day}</span>
                  {blocked && <span className="day-indicator blocked-indicator">🚫</span>}
                  {dateBookings.length > 0 && (
                    <span className="day-indicator booking-indicator">
                      {dateBookings.length} booking{dateBookings.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-calendar-sidebar">
          {selectedDate ? (
            <div className="calendar-date-info">
              <h3>Selected Date</h3>
              <p className="selected-date-display">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>

              {isDateBlocked(selectedDate) ? (
                <>
                  <div className="block-info">
                    <p className="status-badge blocked">Blocked</p>
                    {blockedDates.find(d => d.date === selectedDate)?.reason && (
                      <p className="block-reason">
                        {blockedDates.find(d => d.date === selectedDate).reason}
                      </p>
                    )}
                  </div>
                  <button
                    className="calendar-action-button unblock"
                    onClick={handleToggleBlock}
                  >
                    Unblock Date
                  </button>
                </>
              ) : (
                <>
                  <div className="block-form">
                    <label>Block Reason (optional)</label>
                    <textarea
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="Enter reason for blocking..."
                      rows="3"
                    />
                  </div>
                  <button
                    className="calendar-action-button block"
                    onClick={handleToggleBlock}
                  >
                    Block Date
                  </button>
                </>
              )}

              {getBookingsForDateRange(selectedDate, selectedDate).length > 0 && (
                <div className="date-bookings">
                  <h4>Bookings on this date:</h4>
                  {getBookingsForDateRange(selectedDate, selectedDate).map((booking) => (
                    <div key={booking.id} className="date-booking-item">
                      <p><strong>{booking.propertyName}</strong></p>
                      <p>
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p className="booking-status">{booking.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="calendar-date-info">
              <p>Select a date to view details or block/unblock</p>
            </div>
          )}

          <div className="calendar-legend">
            <h4>Legend</h4>
            <div className="legend-item">
              <div className="legend-color has-booking"></div>
              <span>Has Bookings</span>
            </div>
            <div className="legend-item">
              <div className="legend-color blocked"></div>
              <span>Blocked</span>
            </div>
            <div className="legend-item">
              <div className="legend-color past"></div>
              <span>Past Date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;

