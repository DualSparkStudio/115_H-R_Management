import React from 'react';
import { useData } from '../../context/DataContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPanel = () => {
  const { isAdmin } = useData();

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default AdminPanel;

