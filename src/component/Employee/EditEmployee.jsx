import React, { useEffect, useState } from 'react'
import { fetchDepartments, fetchEmployees } from '../../utils/EmployeeDataHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../../App.css"
import { getAuth } from '../../context/AuthContext';
const EditEmployee = () => {
    const [error,setError] = useState(null);
    const [empData,setEmpData] = useState({});
    const [depResult,setDepResult] = useState(null);
    const [loading,setLoading] = useState(false);
    const {addEmployees,employees} = getAuth();
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();
    console.log(navigate);
    console.log(redirect);
    
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
        const result = {
                ...empData,
                depName:empData?.depData[0].name,
                ...empData?.depData[0],
                ...empData?.employee[0]
        }
        
        const formData = new FormData();
        Object.keys(result).forEach((key)=>{
            if(key !== "employee" && key !== "depData"){
                formData.append(key, result[key])

            }
        })
        
        try {
            const response = await axios.put(`https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/employee_edit/${id}`,formData,{
                withCredentials: true
            })
            console.log(response?.data);
            if(response?.data?.statusCode == 200){
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
            const result = await fetchEmployees();
            const exactEmployee = result.filter((item)=>item._id === id);
            setLoading(true);
            addEmployees(exactEmployee)
            setEmpData(...exactEmployee)

        })()
    },[])
    useEffect(()=>{
        (async()=>{
            const result = await fetchDepartments();
            setDepResult(result);
        })()
       
    },[])
    useEffect(() => {
        if (redirect) {
            console.log("navigating");
            navigate("/admin_dashboard/employee");
        }
    }, [redirect]);

  return (
    <div className='flex items-center justify-center py-15  bg-gray-200'>
        {loading?
            <div className='p-6 w-[90%] rounded shadow space-y-6 bg-white'>
            <h3 className='text-2xl font-semibold rounded'>Edit Employee</h3>
            <div className=''>
                <form onSubmit={handleSubmitForm}>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Name</label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            required={true}
                            value={empData && empData?.employee[0]?.name}
                            placeholder='Insert Name' 
                            className='block w-full mt-2 outline-0.5 rounded px-2 py-2 border border-gray-400 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Email</label>
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            required={true}
                            value={empData && empData.employee[0].email }
                            placeholder='Insert Email' 
                            className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Employee ID</label>
                            <input 
                            type="text" 
                            name="employeeID" 
                            id="employeeID" 
                            required={true}
                            value={empData && empData.employeeID }
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
                            value={empData && empData.dob}
                            placeholder='DOB' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Gender</label>
                            <select id="gender" name='gender' disabled className='block w-full border border-gray-400 rounded mt-2 outline-0.4 px-2 py-2 bg-white' onChange={handleFormData} required={true} >
                                <option value="Male"  >{empData && empData.gender}</option>
                            </select>

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Martial Status</label>
                            <select id="martialStatus" name='martialStatus' className='block w-full mt-2 border border-gray-400 rounded outline-0.4 px-2 py-2 bg-white' onChange={handleFormData} required={true}>
                                <option value="">Martial Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Designation</label>
                            <input 
                            type="text" 
                            name="designation" 
                            id="designation"
                            required={true}
                            value={empData && empData.designation}
                            placeholder='Designation' 
                            className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Department</label>
                            <select id="department" name='department' className='block w-full mt-2 outline-0.4 border border-gray-400 rounded px-2 py-2 bg-white' onChange={handleFormData} >
                                <option value={empData?.depData[0]?._id}>{empData?.depData[0]?.name?.toUpperCase()}</option>
                                
                                {   
                                depResult?.map((item,index)=>{
                                    if(item?.name !== empData?.depData[0]?.name){
                                        return <option key={index} value={item?._id}>{item?.name.toUpperCase()}</option>
                                    }
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
                            value={empData && empData.salary}
                            placeholder='Salary' 
                            className='block w-full mt-2 outline-0.4 rounded border border-gray-400 px-2 py-2 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold' >Password</label>
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            required={true}
                            value={empData && empData.employee[0].password}
                            disabled
                            placeholder='Password' 
                            className='block w-full mt-2 outline-0.4 border rounded px-2 py-2 border-gray-400 bg-white' 
                            onChange={handleFormData}
                            />

                        </div>
                    </div>
                    <div className='mb-3 gap-4 grid md:grid-cols-2  grid-cols-1'>
                        <div className='w-full'>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Role</label>
                             <select id="role"  disabled name="role" className='block w-full mt-2 outline-0.4 rounded border border-gray-400 px-2 py-2 bg-white' onChange={handleFormData}>
                                <option value="" >{empData?.employee[0].role}</option>
                            </select>


                        </div>
                         <div>
                            <label htmlFor="name" className='py-2 mb-2 font-semibold'>Upload Image</label>
                            <input 
                            type="file" 
                            name="image" 
                            id="image" 
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
                        <button type='submit' className='bg-teal-600 text-white rounded px-3 py-2 text-center w-full cursor-pointer focus:scale-95 hover:bg-teal-700'>Edit Employee {loading?<span className='btnLoader'></span>:""}</button>
                    </div>
                </form>
            </div>
        </div>
        : 
        <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
    }
    </div>
  )
}

export default EditEmployee