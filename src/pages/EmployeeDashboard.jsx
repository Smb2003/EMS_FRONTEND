import React, { useEffect } from 'react'
import {getAuth} from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../component/Dashboard/Navbar';
import Sidebar from '../component/Employee/Sidebar'
const EmployeeDashboard = () => {
    const {user} = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user, navigate]);
    return (
    <div className='flex  md:flex-row'>
      <Sidebar/>
      <div className=' md:ml-68 w-full bg-gray-200 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard