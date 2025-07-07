import React, { useEffect, useState } from 'react'
import SearchBar from '../Dashboard/SearchBar'
import "../../App.css"
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
import axios from 'axios';

const LeaveManagement = () => {
    const [loading, setLoading] = useState(false);
    const [isSearchedDep, setIsSearchedDep] = useState(false);
    const [searchedDep, setSearchedDep] = useState("");
    const [leaveData, setLeaveData] = useState([]);
    useEffect(()=>{
        console.log("mounting");
        const fetchLeaveData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/users/emplyeeLeave_get",{
                    withCredentials: true,
                });
                const data = response?.data?.data[0]?.Employee || [];
                console.log(data);
                
                if(response?.data?.statusCode == 200){
                    if(searchedDep == null || searchedDep != ""){
                        console.log(data);
                        const result = data?.filter((item, index) => {
                            return item?.status?.toUpperCase()?.includes(searchedDep?.toUpperCase());
                        })

                        console.log(result);
                        setLeaveData(result);
                    }else{
                        setLeaveData(data); 
                    }   
                }
                
            } catch (error) {
                setLoading(true);
                console.log("Error in LeaveManagement: ", error?.response?.data?.message || "Something went wrong");
            }
        }
        fetchLeaveData();
        const timer = setInterval(()=>{
            console.log("fetching data");
            fetchLeaveData();    
        },5000);
        return () => {
            console.log("unmounting");
            clearInterval(timer);
        }
    },[searchedDep])
    console.log(leaveData)
  return (
    <>
    {
        !loading?
        
            <div className='flex flex-col flex-wrap justify-center md:p-6 py-10'>
                <div className='py-3 mb-3'>
                    <h3 className='text-center text-2xl font-bold'>Manage Leave</h3>
                </div>
                <div className='mb-3'>
                    <SearchBar label="Add Leave" inputLabel="Search By Status" setSearchedDep={setSearchedDep} setIsSearchedDep={setIsSearchedDep} setLoading={setLoading}/>
                </div>
                <div className='flex flex-wrap overflow-x-auto md:w-[calc(100vw -350px)] w-full px-3'> 
                    <DataTable
                    columns={columns}
                    data={leaveData}
                    pagination
                    responsive
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    />
                </div>
            </div>
        :
        <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
    }
    </>
  )
}

export default LeaveManagement