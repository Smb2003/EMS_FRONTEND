import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAuth } from '../../context/AuthContext';
import logo from "../../assets/logo.png";
const EmployeeSummary = () => {
    const [employee, setEmployee] = useState({});
    const{user} = getAuth();
    // console.log(user);
    
    useEffect(() => {
        (async ()=>{
            await axios.get("http://localhost:8080/api/v1/users/employee_get", {
            withCredentials: true
            })
            .then(res => {
                let data = res?.data?.data;
                const filterUser = data?.filter(emp => emp?.userID === user?._id);
                data = filterUser[0];
                console.log("emp",data);
                if (data) {
                setEmployee(data);
                }
            })
            .catch(err => {
                console.log("Dashboard fetch error", err);
            })}
        )()
    }, []);
  return (
    <div className=''>
        <div className='shadow bg-white p-2'>
            <marquee className='font-semibold text-2xl'>Welcome Back,  <span className='font-bold md:text-2xl text-teal-600 text-center ' security='true' >{employee.employee && employee?.employee[0]?.name}</span></marquee>
        </div>
        <div className='flex items-center justify-center flex-1 py-50 sm:py-6 bg-gray-200'>
            <div className=' flex flex-col items-center justify-center w-84'>
                <img src={logo} alt="" srcset="" className='grid place-content-center h-72'/>
                <h1 className='font-servillana text-4xl md:text-5xl text-cyan-700'>Employee MS</h1>
            </div>
        </div>
    </div>
  )
}

export default EmployeeSummary