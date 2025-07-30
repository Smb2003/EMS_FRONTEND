import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosSpeedometer } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiInterleavedArrows } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import { getAuth } from '../../context/AuthContext';
const Sidebar = () => {
    const {user} = getAuth();
    const [emp,setEmp] = useState({});
    const [isSliderOpen,setIsSliderOpen] = useState(false);
   useEffect(()=>{
     if(user){
        setEmp(user);
    }
   },[])
    const links = [
        {
            label: "Dashboard",
            icon:<FaUserGroup/>,
            to: "/emp_dashboard",
            end: true
        },
        {
            label: "My Profile",
            icon:<FaUserGroup/>,
            to: `${emp?._id && `/emp_dashboard/viewInfo/${emp?._id}`}`,
            end: true
        },
        {
            label: "Leave",
            icon:<GiInterleavedArrows/>,
            to: "/emp_dashboard/leave",
            end: false
        },
        {
            label: "Salary",
            icon:<FaMoneyBillWave/>,
            to: `${emp?._id && `/emp_dashboard/salary/${emp?._id}`}`,
            end: false
        },
        {
            label: "Setting",
            icon:<IoMdSettings/>,
            to: "/emp_dashboard/setting",
            end: false
        }
    ]
  return (
    <>
        <div className='md:hidden py-1 fixed top-2 left-4 z-50'>
            <button onClick={()=>setIsSliderOpen(true)}>
                <RxHamburgerMenu size={30} className='text-gray-200 p-1 rounded'/>
            </button>
        </div>
        {
            
            <div className={`flex flex-col bg-gray-800 text-white space-y-2 md:h-screen h-screen top-0 left-0 fixed z-70 w-64 md:w-68 font-bold transform transition-transform ease-in-out duration-300 ${isSliderOpen? "translate-x-0": "-translate-x-full"} md:translate-x-0 md:block`}>
                <div className='w-full md:text-center text-center px-4 md:px-0 md:h-12 h-14 bg-teal-600 font-servillana flex justify-between'>
                    <h3 className='py-4 md:py-2 md:px-14  text-xl md:text-2xl sm:text-xl'>Employee MS</h3>
                    <button 
                    onClick={()=>setIsSliderOpen(false)}
                    className='font-sans text-2xl foucs:scale-95 md:hidden'
                    >
                        X
                    </button>
                </div>

                <div className='px-3 md:block'>
                    {
                        links.map((link, index) => (
                            <NavLink  
                                key={index}
                                to={link.to}
                                end={link.end}
                                onClick={()=>setIsSliderOpen(false)}
                                className={({isActive})=> `${isActive? "bg-teal-600 ":""}flex items-center space-x-4 py-2.5 px-4 mb-4 rounded hover:scale-105 `}>
                                {link.icon}
                                <span>{link.label}</span>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        }
    </>
  )
}

export default Sidebar