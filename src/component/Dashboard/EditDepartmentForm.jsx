import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from '../../context/AuthContext';

const EditDepartmentForm = () => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [error,setError] = useState("");
    const [singleUser,setSingleUser] = useState({});
    const navigate = useNavigate();
    const {department} = getAuth();
    const {id} = useParams();
    console.log(id);
    console.log(singleUser);
    
    // const {addDepartment} = getAuth();
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8080/api/v1/users/department_edit",{
                name,
                description
            },{
                withCredentials: true
            });
            console.log("DEpartment Data ",response);

            if(response?.data?.statusCode === 200){
                // addDepartment(response?.data?.data);
                setName("");
                setDescription("");
                navigate("/admin_dashboard/departmentList");
            }
        } catch (error) {
            console.log(error);
            const response = error?.response?.data?.message || "Something went wrong!";
            setError(response);

            setTimeout(() => {
                setError("");
            }, 1000);
        }
    }
    useEffect(()=>{
        const user = department?.find(item => item._id == id);
        console.log(department);
        
        if(!user){
            setSingleUser(null);
        }
        setSingleUser({
            ...singleUser,...user
        })
    },[])
  return (
    <div className='flex items-center justify-center py-15'>
        <div className='w-96 p-6 rounded shadow space-y-6 bg-white'>
            <h3 className='text-2xl text-center font-semibold rounded'>Add New Department</h3>
            <div className=''>
                <form onSubmit={handleSubmitForm}>
                    <div className='mb-3'>
                        <label htmlFor="name" className='py-2 mb-2 font-semibold'>Department Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        required={true}
                        value={singleUser?.name}
                        placeholder='Department Name' 
                        className='flex flex-wrap w-full mt-2 outline-0.4 px-2 py-2 bg-white' 
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className='py-2 mb-2 font-semibold'>Description</label>
                        <textarea 
                        name="description" 
                        id="description" 
                        rows={4}
                        value={singleUser?.description} 
                        className='flex flex-wrap w-full border mt-2 px-2 py-2 bg-white' 
                        placeholder='Description..'
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    {
                        error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                    }
                    <div>
                        <button type='submit' className='bg-teal-600 text-white rounded px-3 py-2 text-center w-full cursor-pointer focus:scale-95 hover:bg-teal-700'>Edit Department</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditDepartmentForm