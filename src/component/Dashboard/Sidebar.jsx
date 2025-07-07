import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosSpeedometer } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { GiInterleavedArrows } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: "/admin_dashboard", icon: <IoIosSpeedometer />, label: "Dashboard" },
    { to: "/admin_dashboard/employee", icon: <FaUserGroup />, label: "Employee" },
    { to: "/admin_dashboard/departmentList", icon: <FaBuilding />, label: "Department" },
    { to: "/admin_dashboard/leave", icon: <GiInterleavedArrows />, label: "Leave" },
    { to: "/admin_dashboard/salary", icon: <FaMoneyBillWave />, label: "Salary" },
    { to: "/admin_dashboard/setting", icon: <IoMdSettings />, label: "Setting" },
  ];

  return (
    <>
      <div className="md:hidden fixed top-2 left-4 py-1 z-50">
        <button onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu size={30} className="text-gray-200 p-1 rounded" />
        </button>
      </div>

      <div
        className={`
          bg-gray-800 text-white z-50
          fixed top-0 left-0 h-full w-64
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block
        `}
      >
        <div className="flex justify-between items-center h-14 px-4 bg-teal-600 font-servillana">
          <h3 className="text-2xl">Employee MS</h3>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
        </div>

        <div className="px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) =>
                `${isActive ? 'bg-teal-600' : ''} flex items-center space-x-4 py-2.5 px-4 mb-4 rounded hover:scale-105`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
