import axios from 'axios';
import React, { useState } from 'react'

const Setting = () => {
    const [password,setPassword] = useState("");
    const [NewPassword,setNewPassword] = useState("");
    const [error,setError] = useState("");
    const [successMsg,setSuccessMsg] = useState("");
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/updatePassword",{
                password,
                NewPassword
            },{
                withCredentials: true
            });
            console.log("Password ",response);

            if(response?.data?.statusCode === 200){
                setPassword("");
                setNewPassword("");
                setSuccessMsg(response?.data?.data?.message || "Password updated successfully!");
                setTimeout(() => {
                    setSuccessMsg("");
            }, 1000);
            }
        } catch (error) {
            console.log(error);
            const response = error?.response?.data?.message || "Something went wrong!";
            setError(response);

            setTimeout(() => {
                setError("");
                setSuccessMsg("");
            }, 1000);
        }
    }
  return (
    <div className='flex items-center justify-center md:py-15 sm:p-15 py-50 h-cal[100vh-16px]'>
        <div className='md:w-96 w-80 sm:w-[600px] h-[350px] sm:p-10 p-6 rounded shadow space-y-6 bg-white'>
            <h3 className='text-2xl text-center font-semibold rounded'>Update Password</h3>
            <div className=''>
                <form onSubmit={handleSubmitForm}>
                    <div className='mb-3'>
                        <label htmlFor="name" className='py-2 mb-2 font-semibold'>Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        required={true}
                        value={password}
                        placeholder='Department Name' 
                        className='flex flex-wrap w-full mt-2 border border-gray-400 outline-0.4 px-2 py-2 bg-white' 
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="name" className='py-2 mb-2 font-semibold'>New Password</label>
                        <input 
                        type="password" 
                        name="NewPassword" 
                        id="NewPassword" 
                        required={true}
                        value={NewPassword}
                        placeholder='Insert New Password' 
                        className='flex flex-wrap w-full mt-2 outline-0.4 border border-gray-400 px-2 py-2 bg-white' 
                        onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </div>
                    {
                        successMsg && <div className='text-green-600 px-3 py-2 mb-3'>{successMsg}</div>
                    }
                    {
                        error && <div className='text-red-600 px-3 py-2 mb-3'>{error}</div>
                    }
                    <div>
                        <button type='submit' className='bg-teal-600 text-white rounded px-3 py-2 text-center w-full cursor-pointer focus:scale-95 hover:bg-teal-700'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Setting