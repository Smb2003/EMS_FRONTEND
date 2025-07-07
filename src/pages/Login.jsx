import axios, { Axios } from 'axios';
import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom';
import { getAuth } from '../context/AuthContext';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const {login} = getAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/login",{
                email,
                password
            },{
                withCredentials:true
            })
            console.log(response);
            
            if(response?.status === 200){
                if(response?.data?.data?.user?.role === "Admin"){
                    console.log("UserDAta: ",response?.data?.data?.user);
                    login(response?.data?.data?.user);
                    setEmail("");
                    setPassword("");
                    navigate("/");

                }
                else{
                    login(response?.data?.data?.user);
                    navigate('/emp_dashboard');
                }
            }
            else{
                setError(response);
                console.log(error);
                
            }
            
        } catch (error) {
            console.log("Login Error:", error);
            
            const message = error?.response?.data?.message || "Something went wrong!";
            setError(message);

            setTimeout(() => {
                setError(null);
            }, 2000);
            
                    }
                    
    }
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50%  to-gray-100 to-50% space-y-6'> 
        <h1 className='font-servillana md:text-3xl text-2xl text-white'>Employee Management System.</h1>
        <div className='border shadow p-6 w-80 md:80  bg-white'>
            <h2 className='text-2xl font-extrabold mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-800 font-semibold py-2'>Email</label>
                    <input
                        type="email"
                        name="email" 
                        id="email" 
                        value={email}
                        className='w-full px-3 py-2 border rounded-sm' 
                        placeholder='Enter Email Address'
                        required={true}
                        autoComplete={true}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-800 font-semibold py-2'>Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password}
                    required={true}
                    className='w-full px-3 py-2 border rounded-sm' 
                    id="password" 
                    placeholder='********'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                {
                    error && <div className='text-red-500 mb-2 '>{error}</div>
                }
                <div className='mb-4 flex items-center justify-between'>
                    
                    <a href="#" className='underline text-teal-600'>Forgot Password</a>
                </div>
                <div className='mb-4'>
                    <button className='w-full bg-teal-600 py-2 text-white rounded-sm cursor-pointer focus:scale-95 '>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login