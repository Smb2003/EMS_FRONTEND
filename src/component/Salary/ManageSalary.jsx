import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchDepartments, fetchEmployees } from '../../utils/EmployeeDataHelper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageSalary = () => {
    const [form,setForm] = useState({});
    const [department,setDepartment] = useState(null);
    const [error,setError] = useState("");
    const[empData,setEmpData] = useState([]);
    const[selecteEempData,setSelecteEempData] = useState(null);
    const[depData,setDepData] = useState([]);
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
            const response = await axios.post("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/salary_add",form,{
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
    const fetchSelectedDepartmentEmployees = () =>{
        const result = empData?.filter((item)=>{
            return item?.department == department;
        })
        // console.log(result);
        setSelecteEempData(result);
    }
    useEffect(()=>{
        (async ()=>{
            const result = await fetchEmployees();
            setEmpData(result);
        })()
    },[])
    useEffect(()=>{
        (async ()=>{
            const result = await fetchDepartments();
            setDepData(result);
        })()
    },[])
    useEffect(()=>{
        if(redirect){
            navigate("/admin_dashboard/employee");
        }
    },[redirect])
    useEffect(()=>{
        fetchSelectedDepartmentEmployees();
    },[department])
  return (
    <>
    {
        !loading?
            <div className='flex flex-col justify-center items-center md:py-10 py-20 h-cal[100vh-14px] bg-gray-200'>
                <div className='w-[80%] bg-white p-6'>
                    <h3 className='md:text-2xl text-2xl font-semibold mb-3 md:py-2 py-2'>Add New Salary</h3>
                    <form onSubmit={submitFormData}>
                        <div className='mb-3 gap-4 grid md:grid-cols-2 grid-cols-1'>
                            <div className='w-full'>
                                    <label htmlFor="name" className='py-2 mb-2 font-semibold'>Department</label>
                                    <select id="department" name='department' className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' onChange={(e)=>setDepartment(e.target.value)} required={true}>
                                        <option value="">Select Department</option>
                                        {
                                            depData && depData?.map((item,index)=>{
                                                // console.log(item);
                                                
                                                return <option key={index} value={item?._id}>{item?.name?.toUpperCase()}</option> 
                                            })
                                        }
                                    </select>

                            </div>
                            <div>
                                    <label htmlFor="name" className='py-2 mb-2 font-semibold'>Employee</label>
                                    <select id="employeeID" name='employeeID' className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' onChange={handleFormData} required={true}>
                                        <option value="">Select Employees</option>
                                    {
                                            selecteEempData && selecteEempData?.map((item,index)=>{
                                                // console.log(item);
                                                
                                                return <option key={index} value={item?._id}>{item?.employee && item?.employee[0]?.name?.toUpperCase()}</option> 
                                            })
                                        }
                                    </select>

                                </div>
                        </div>
                        <div className='mb-3 gap-4 grid md:grid-cols-2 grid-cols-1'>
                            <div className='w-full'>
                                    <label htmlFor="basicSalary" className='py-2 mb-2 font-semibold'>Basic Salary</label>
                                    <input 
                                    type="text" 
                                    name="basicSalary" 
                                    id="basicSalary"
                                    required={true}
                                    placeholder='Insert Salary' 
                                    className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                    onChange={handleFormData}
                                    />

                            </div>
                            <div>
                                <label htmlFor="allowance" className='py-2 mb-2 font-semibold'>Allowances</label>
                                    <input 
                                    type="text" 
                                    name="allowance" 
                                    id="allowance"
                                    required={true}
                                    placeholder='Monthly Allowance' 
                                    className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                    onChange={handleFormData}
                                    />

                                </div>
                        </div>
                        <div className='mb-3 gap-4 grid md:grid-cols-2 grid-cols-1'>
                            <div className='w-full'>
                                    <label htmlFor="monthlyDeduction" className='py-2 mb-2 font-semibold'>Monthly Deduction</label>
                                    <input 
                                    type="text" 
                                    name="monthlyDeduction" 
                                    id="monthlyDeduction"
                                    required={true}
                                    placeholder='Monthly Deduction' 
                                    className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                    onChange={handleFormData}
                                    />

                            </div>
                            <div>
                                    <label htmlFor="payDate" className='py-2 mb-2 font-semibold'>Pay Date</label>
                                    <input 
                                    type="date" 
                                    name="payDate" 
                                    id="payDate"
                                    placeholder='payDate' 
                                    className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                                    onChange={handleFormData}
                                    />

                            </div>
                        </div>
                        {
                            error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                        }
                        <div>
                            <button className='rounded text-white bg-teal-600 w-full py-2 px-2 focus:scale-95 hover:bg-teal-700 cursor-pointer'>Add Salary</button>
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

export default ManageSalary