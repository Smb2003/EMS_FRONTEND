import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeaveForm = () => {
    const [form,setForm] = useState({});
    const [error,setError] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();
    const handleFormData = (e)=> {
        const {name,value} = e.target;
        setForm((prevData) => ({...prevData, [name]:value}));
    }
    const submitFormData = async (e) => {
        e.preventDefault();
        console.log(form) 
        try {
            const response = await axios.post("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/leave_add",form,{
                withCredentials: true
            });
            console.log(response?.data?.data);
            if(response?.data?.statusCode == 200){
                setRedirect(true)
            }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || "Something went wrong."
            setLoading(true);
            setError(msg)
        }
    }
    useEffect(()=>{
        if(redirect){
            navigate("/emp_dashboard/leave");
        }
    },[redirect])
  return (
    <>
    {
        !loading?
            <div className='flex flex-col justify-center items-center py-10'>
                <div className='w-[80%] bg-white p-6'>
                    <h3 className='md:text-2xl text-xl font-semibold mb-3 py-2'>Add Leave</h3>
                    <form onSubmit={submitFormData}>
                        <div className='mb-3 gap-4 grid md:grid-cols-2 grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="leaveType" className='py-2 mb-2 font-semibold'>Leave Type</label>
                            <input 
                            type="text" 
                            name="leaveType" 
                            id="leaveType"
                            required={true}
                            placeholder='Insert Leave Type' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                            </div>
                            <div>
                                <label htmlFor="startDate" className='py-2 mb-2 font-semibold'>Start Date</label>
                                <input 
                                type="date" 
                                name="startDate" 
                                id="startDate"
                                required={true}
                                placeholder='startDate' 
                                className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                onChange={handleFormData}
                                />

                            </div>
                        </div>
                        <div className='mb-3  space-x-5 grid grid-cols-1'>
                           <div>
                                <label htmlFor="endDate" className='py-2 mb-2 font-semibold'>End Date</label>
                                <input 
                                type="date" 
                                name="endDate" 
                                id="endDate"
                                required={true}
                                placeholder='endDate' 
                                className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                onChange={handleFormData}
                                />

                            </div>
                        </div>
                        <div className='mb-3 space-x-5 grid grid-cols-1'>
                            <div>
                                <label htmlFor="monthlyDeduction" className='py-2 mb-2 font-semibold'>Description</label>
                                <textarea 
                                name="description" 
                                id="description" 
                                onChange={handleFormData} 
                                className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                placeholder='Insert Description'
                                rows={2}
                                cols={60}
                                ></textarea>

                            </div>
                            
                        </div>
                        {
                            error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                        }
                        <div>
                            <button className='rounded text-white bg-teal-600 w-full py-2 px-2 focus:scale-95 hover:bg-teal-700 cursor-pointer'>Add leave</button>
                        </div>
                    </form>
                </div>
            </div>
        :
        <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>

    }
    </>
  )
}

export default AddLeaveForm