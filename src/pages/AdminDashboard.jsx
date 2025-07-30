import React, { useEffect } from 'react';
import { getAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Dashboard/Sidebar';
import Navbar from '../component/Dashboard/Navbar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = getAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className='flex md:flex-row'>
      <Sidebar />
      <div className='md:ml-64 w-full bg-gray-200 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
