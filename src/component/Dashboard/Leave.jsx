import React, { useEffect, useState } from 'react'
import "../../App.css"
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { columns, LeaveDataActions} from '../../utils/AdminLeaveHelper';

const Leave= () => {
    const [loading, setLoading] = useState(false);
    const [leaveData, setLeaveData] = useState([]);
    const updateLeaveData = (newData) => {
        // console.log(newData);
        const data = newData.map((item, index) => {
            console.log(item)
            return {
                ...item,
                actions: <LeaveDataActions leaveID={item?._id}/>,
            }
        }).filter(item => item?.status !== "Rejected");
        setLeaveData(data);
    }
    useEffect(()=>{
        console.log("mounting");
        const fetchLeaveData = async () => {
            try {
                const response = await axios.get("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/leave_get",{
                    withCredentials: true,
                });
                const data = response?.data?.data || [];
                // console.log(response?.data?.data);
                
                if(response?.data?.statusCode == 200){
                        const result = data.flatMap((data) => {
                            const userName = data.User[0]?.name || "Unknown";

                            return data.Employee.map(emp => ({
                                ...emp,
                                name: userName
                            }));
                        });
                        console.log(result);
                        updateLeaveData(result);
                }
            } catch (error) {
                setLoading(true);
                console.log("Error in LeaveManagement: ", error?.response?.data?.message || "Something went wrong");
            }
        };
        fetchLeaveData();
         const timer = setInterval(()=>{
            console.log("fetching data");
            fetchLeaveData();
        },5000);

        return () => {
            console.log("unmounting");
            clearInterval(timer);
        }
    },[])
    // console.log(leaveData)
  return (
    <>
    {
        !loading?
        
            <div className='flex flex-col flex-wrap justify-center p-6'>
                <div className='md:py-3 sm:py-10 mt-10 py-10 mb-3'>
                    <h3 className='text-center text-2xl font-bold'>Manage Leave</h3>
                </div>
                <div className='flex flex-wrap md:w-[calc(100vw-350px)] w-full overflow-x-auto '>
                    <DataTable
                    columns={columns}
                    data={leaveData}
                    pagination
                    responsive
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    />
                </div>
            </div>
        :
        <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
    }
    </>
  )
}

export default Leave