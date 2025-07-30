import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmployeeInfo = () => {
    const {id} = useParams();
    const [error,setError] = useState(null);
    const [user,setuser] = useState({});
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/employee_get",{
                    withCredentials: true
                })
                
                if(response?.data?.statusCode == 200){
                    const result = response?.data?.data;
                    console.log(result);
                    
                    const exactuserData = result?.filter(item=> (item._id == id || item?.userID == id));
                    setuser(...exactuserData);
                }
            } catch (error) {
                setLoading(true)
                console.log(error?.response?.data?.message);
                setError(error?.response?.data?.message)
            }

        })()
    },[])
    console.log(user)
  return (
    <div className='flex flex-col flex-wrap justify-center items-center py-7 h-cal[100vh-16px] bg-gray-200'>
        {
            !loading ?
            <div className='w-[80%] h-full bg-white p-3  rounded-xl'>
                <h3 className='text-center font-bold text-2xl py-4'>Employee Details</h3>
                <div className='flex flex-wrap justify-center items-center'>
                    <div className='md:w-[40%] py-2 mx-4'>
                        <img src={user?.employee && user?.employee[0]?.profileImage} alt='User Image' className='rounded h-full w-64 '/>
                    </div>
                    <div className='grid grid-cols-1 gap-5 p-4'>
                        <p className='font-semibold'><span className='font-bold'>NAME: </span>{user?.employee && user?.employee[0]?.name?.toUpperCase()}</p>
                        <p className='font-semibold'><span className='font-bold'>EMAIL: </span>{user?.employee && user?.employee[0]?.email?.toUpperCase()}</p>
                        <p className='font-semibold'><span className='font-bold'>EMPLOYEE ID: </span>{user && user?.employeeID} </p>
                        <p className='font-semibold'><span className='font-bold'>GENDER: </span>{user && user?.gender?.toUpperCase()} </p>
                        <p className='font-semibold'><span className='font-bold'>DATE OF BIRTH: </span>{user && user?.dob} </p>
                        <p className='font-semibold'><span className='font-bold'>MARTIAL STATUS: </span>{user && user?.martialStatus?.toUpperCase()} </p>
                        <p className='font-semibold'><span className='font-bold'>DESIGNATION: </span>{user && user?.designation?.toUpperCase()} </p>
                        <p className='font-semibold'><span className='font-bold'>DEPARTMENT: </span>{user?.depData && user?.depData[0]?.name?.toUpperCase()} </p>
                    </div>
                </div>
            </div>
            :
            <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
        }
    </div>
  )
}

export default EmployeeInfo