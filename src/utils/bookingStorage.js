// Booking and date management storage utilities

const BOOKINGS_KEY = 'luxestay-bookings';
const BLOCKED_DATES_KEY = 'luxestay-blocked-dates';

export const getBookings = () => {
  try {
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error loading bookings:', error);
    return [];
  }
};

export const saveBooking = (booking) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      ...booking,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, confirmed, cancelled
    };
    bookings.push(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return newBooking;
  } catch (error) {
    console.error('Error saving booking:', error);
    return null;
  }
};

export const updateBookingStatus = (bookingId, status) => {
  try {
    const bookings = getBookings();
    const updated = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error updating booking:', error);
    return false;
  }
};

export const deleteBooking = (bookingId) => {
  try {
    const bookings = getBookings();
    const filtered = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};

export const getBlockedDates = () => {
  try {
    const blocked = localStorage.getItem(BLOCKED_DATES_KEY);
    return blocked ? JSON.parse(blocked) : [];
  } catch (error) {
    console.error('Error loading blocked dates:', error);
    return [];
  }
};

export const blockDate = (dateString, reason = '') => {
  try {
    const blocked = getBlockedDates();
    if (!blocked.find(d => d.date === dateString)) {
      blocked.push({ date: dateString, reason, blockedAt: new Date().toISOString() });
      blocked.sort((a, b) => new Date(a.date) - new Date(b.date));
      localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(blocked));
    }
    return true;
  } catch (error) {
    console.error('Error blocking date:', error);
    return false;
  }
};

export const unblockDate = (dateString) => {
  try {
    const blocked = getBlockedDates();
    const filtered = blocked.filter(d => d.date !== dateString);
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error unblocking date:', error);
    return false;
  }
};

export const isDateBlocked = (dateString) => {
  const blocked = getBlockedDates();
  return blocked.some(d => d.date === dateString);
};

export const getBookingsForDateRange = (startDate, endDate) => {
  const bookings = getBookings();
  return bookings.filter(booking => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if booking overlaps with date range
    return (checkIn <= end && checkOut >= start);
  });
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

