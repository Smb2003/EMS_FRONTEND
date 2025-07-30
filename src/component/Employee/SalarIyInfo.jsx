import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import { columns } from '../../utils/SalaryHelper';

const SalarIyInfo = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([]);
    const {id} = useParams(); 
    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get(`https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/salary_get/${id}`,{
                    withCredentials: true
                });
                console.log(response?.data?.data);
                if(response?.data?.statusCode == 200){
                    setData(response?.data?.data)
                }
            } catch (error) {
                console.log(error);
                const msg = error?.response?.data?.message || "Something went wrong!"
                setLoading(true);
                setError(msg);

            }
        })()
    },[])

    useEffect(()=>{

    },[])
    console.log(data)
  return (
    <div className='md:py-15 md:px-2 py-20'>
        <h3 className='px-3 font-semibold md:text-2xl text-3xl'>Salary Summary</h3>
        <div className='px-3 mt-10 text-2xl'>
            <DataTable 
            columns={columns}
            data={data}/>
        </div>
    </div>
  )
}

export default SalarIyInfo