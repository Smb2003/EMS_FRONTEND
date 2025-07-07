import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddNewDepartmentForm = () => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();
    // const {addDepartment} = getAuth();
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/department_add",{
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
                        value={name}
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
                        value={description} 
                        className='flex flex-wrap w-full border mt-2 px-2 py-2 bg-white' 
                        placeholder='Description..'
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    {
                        error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                    }
                    <div>
                        <button type='submit' className='bg-teal-600 text-white rounded px-3 py-2 text-center w-full cursor-pointer focus:scale-95 hover:bg-teal-700'>Add Department</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddNewDepartmentForm