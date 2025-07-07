import React from 'react'
import { getAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {user,logout} = getAuth(); 
    const navigate = useNavigate();
    const logOut = async (e) =>{
        e.preventDefault();
        await logout();
        navigate("/login");
    }
  return (
    <div className='flex justify-between items-center text-white px-5 md:py-5 py-7 h-14 top-0 bg-teal-600'>
        <p className='text-xl font-serif px-9 py-2 md:px-0'>Welcome, {user.name}</p>
        <button className='p-2 rounded-sm border shadow text-md focus:scale-95 hover:bg-teal-800 cursor-pointer text-white' onClick={logOut}>Logout</button>
    </div>
  )
}

export default Navbar