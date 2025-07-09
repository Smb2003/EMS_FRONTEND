import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeDataHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../App.css"
import { getAuth } from '../../context/AuthContext';
const AddEmployee = () => {
    const [error,setError] = useState(null);
    const [empData,setEmpData] = useState({});
    const [depResult,setDepResult] = useState(null);
    const [loading,setLoading] = useState(false);
    const [redirect,setRedirect] = useState(false);
    console.log(depResult);
    const navigate = useNavigate();
    // const {addEmployees} = getAuth();
    const handleFormData = (e) => {
        const {name,value,files} = e.target;
        if(name == "image"){
            setEmpData((prevData) => ({...prevData, [name]: files[0]}));
        }
        else{
            setEmpData((prevData) => ({...prevData, [name]:value}))
        }
    } 
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("data", empData);
        const formData = new FormData();
        Object.keys(empData).forEach((key)=>{
            formData.append(key, empData[key])
        })

        try {
            const response = await axios.post("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/employee_add",formData,{
                withCredentials: true
            })

            if(response?.data?.statusCode == 200){
                // setLoading(true);
                setRedirect(true);
                
            }  
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.message || "Something went wrong!";
            setError(message);
        }
    }
    useEffect(()=>{
        (async()=>{
            const result = await fetchDepartments();
            setDepResult(result)

        })()
    },[])

    useEffect(()=>{
        if(redirect){
            navigate("/admin_dashboard/employee");
        }
    },[redirect])
    
  return (
    <div className='flex items-center justify-center py-15  bg-gray-200'>
        <div className='p-6 w-[90%] rounded shadow space-y-6 bg-white'>
            <h3 className='text-2xl font-semibold rounded'>Add New Employee</h3>
            <div className=''>
                <form onSubmit={handleSubmitForm}>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Name <span className='text-red-600'>*</span></label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            required={true}
                            placeholder='Insert Name' 
                            className='block w-full mt-2 outline-0.5 rounded px-2 py-2 border border-gray-400 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Email <span className='text-red-600'>*</span></label>
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            required={true}
                            placeholder='Insert Email' 
                            className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3  gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Employee ID <span className='text-red-600'>*</span></label>
                            <input 
                            type="text" 
                            name="employeeID" 
                            id="employeeID" 
                            required={true}
                            placeholder='Employee ID' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Date of Birth</label>
                            <input 
                            type="date" 
                            name="dob" 
                            id="dob"
                            placeholder='DOB' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Gender <span className='text-red-600'>*</span></label>
                            <select id="gender" name='gender' className='block w-full border border-gray-400 rounded mt-2 outline-0.4 px-2 py-2 bg-white' onChange={handleFormData} required={true}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Martial Status <span className='text-red-600'>*</span></label>
                            <select id="martialStatus" name='martialStatus' className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' onChange={handleFormData} required={true}>
                                <option value="">Martial Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Designation <span className='text-red-600'>*</span></label>
                            <input 
                            type="text" 
                            name="designation" 
                            id="designation"
                            required={true}
                            placeholder='Designation' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Department <span className='text-red-600'>*</span></label>
                            <select id="department" name='department' className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' onChange={handleFormData}>
                                <option value="">Choose Department</option>
                                {
                                    depResult?.map((item,index)=>{
                                        return(
                                            <option key={index} value={item._id}>{item.name.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Salary</label>
                            <input 
                            type="text" 
                            name="salary" 
                            id="salary"
                            placeholder='Salary' 
                            className='block w-full mt-2 outline-0.4 rounded border border-gray-400 px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold' >Password <span className='text-red-600'>*</span></label>
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            required={true}
                            placeholder='Password' 
                            className='block w-full mt-2 outline-0.4 border rounded px-2 py-2 border-gray-400 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Role <span className='text-red-600'>*</span></label>
                             <select id="role" name="role" className='block w-full mt-2 outline-0.4 rounded border border-gray-400 px-2 py-2 bg-white' onChange={handleFormData}>
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>


                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Upload Image <span className='text-red-600'>*</span></label>
                            <input 
                            type="file" 
                            name="image" 
                            id="image" 
                            required={true}
                            placeholder='Upload Image'
                            className='block w-full mt-2 border outline-0.4 px-2 py-2 border-gray-400 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    {
                        error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                    }
                    <div>
                        <button type='submit' className='bg-teal-600 text-white rounded px-3 py-2 text-center w-full cursor-pointer focus:scale-95 hover:bg-teal-700'>Add Employee {loading?<span className='btnLoader'></span>:""}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddEmployee