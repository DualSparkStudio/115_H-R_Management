import React, { useState } from 'react';
import { isDateBlocked } from '../utils/bookingStorage';
import './BookingCalendar.css';

const BookingCalendar = ({ checkInDate, checkOutDate, onDateSelect, disabledDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedType, setSelectedType] = useState('checkin'); // 'checkin' or 'checkout'

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
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    const dateStr = formatDate(date);
    
    // Check if date is in disabledDates array
    if (disabledDates.some(d => formatDate(new Date(d)) === dateStr)) return true;
    
    // Check if date is blocked
    if (isDateBlocked(dateStr)) return true;
    
    return false;
  };

  const isDateInRange = (date) => {
    if (!checkInDate || !checkOutDate) return false;
    const dateStr = formatDate(date);
    const checkInStr = formatDate(checkInDate);
    const checkOutStr = formatDate(checkOutDate);
    return dateStr > checkInStr && dateStr < checkOutStr;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (isDateDisabled(clickedDate)) return;

    if (selectedType === 'checkin') {
      if (checkOutDate && clickedDate >= checkOutDate) {
        // If clicked date is after check-out, set it as new check-out
        onDateSelect('checkout', clickedDate);
        setSelectedType('checkout');
      } else {
        onDateSelect('checkin', clickedDate);
        setSelectedType('checkout');
      }
    } else {
      if (clickedDate <= checkInDate) {
        // If clicked date is before check-in, set it as new check-in
        onDateSelect('checkin', clickedDate);
        setSelectedType('checkout');
      } else {
        onDateSelect('checkout', clickedDate);
        setSelectedType('checkin');
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

  return (
    <div className="booking-calendar">
      <div className="calendar-header">
        <button className="calendar-nav-button" onClick={handlePrevMonth}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="calendar-month-year">
          {months[month]} {year}
        </h3>
        <button className="calendar-nav-button" onClick={handleNextMonth}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="calendar-weekdays">
        {days.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const isDisabled = isDateDisabled(date);
          const isSelected = 
            (checkInDate && formatDate(date) === formatDate(checkInDate)) ||
            (checkOutDate && formatDate(date) === formatDate(checkOutDate));
          const isInRange = isDateInRange(date);
          const isCheckIn = checkInDate && formatDate(date) === formatDate(checkInDate);
          const isCheckOut = checkOutDate && formatDate(date) === formatDate(checkOutDate);

          return (
            <button
              key={day}
              className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isCheckIn ? 'checkin' : ''} ${isCheckOut ? 'checkout' : ''}`}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;

