import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import "../App.css";
import axios from 'axios';
import {getAuth} from '../context/AuthContext'
const ProtectedRoutes = () => {
    const{user,login} = getAuth();
    const [auth,setAuth] = useState(null);

   useEffect(() => {
    axios.get("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/check", {
        withCredentials: true
      })
      .then((res) =>{
        login(res?.data?.user);
        setAuth(true)
      } )
      .catch((error) =>{
        login(null);
        setAuth(false)
      });
  }, []);
    if (auth === null) return <div className='h-screen'><span className="loader"></span></div>;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes