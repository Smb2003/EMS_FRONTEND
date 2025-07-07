
import React, { useEffect, useState } from 'react'
import SearchBar from '../Dashboard/SearchBar'
import "../../App.css"
import DataTable from 'react-data-table-component';
import { columns,EmployeeActions } from '../../utils/EmployeeDataHelper';
import axios from 'axios';
const List = () => {
    const [loading,setLoading] = useState(false);
    const [searchedDep, setSearchedDep] = useState("");
    const [empData,setEmpData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    console.log(searchedDep);
    
    const updateData = (data) =>{
        console.log(data);
        const result = data?.map((item,index)=>{
            
            return(
                {
                    ...item,
                    sno: index + 1,
                    depData: {...item?.depData} ,
                    actions: <EmployeeActions id={item._id} setRefresh={setRefresh}/>
                }
            )
        })
        setEmpData(result);
    }
    useEffect(() => {
      (async ()=>{
        try {
            const response = await axios.get("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/employee_get",{
                withCredentials: true
            })
            const data = response?.data?.data || [];
            
            if(response?.data?.statusCode == 200){
                if(searchedDep == null || searchedDep != ""){
                    const result = data?.filter((itm)=>{
                        if(itm?.employee[0].name.toUpperCase().includes(searchedDep.toUpperCase())){
                            return{
                                ...itm,
                                employee: itm?.employee[0]
                            
                        }}
                    })
                    updateData(result);
                }
                else{
                    updateData(data);
                }
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            setLoading(false);
        }
      })()
    
    }, [refresh,searchedDep])
    console.log(empData)
    return (
        <>
            {
                !loading ?
                    <div className='px-4 py-4 flex flex-col h-cal[100vh-16px] bg-gray-200'>
                        <h3 className='text-2xl text-center font-semibold'>Manage Employees</h3>
                        <div>
                            <SearchBar setIsSearchedDep={setRefresh} setLoading={setLoading} setSearchedDep={setSearchedDep} inputLabel={"Search Employees"} label={"Add New Employees"}/>            
                        </div>
                        <div className='mt-5 px-3 '>
                            {
                                !refresh? 
                                    <div className='flex flex-wrap md:w-[calc(100vw-350px)] w-full overflow-x-auto '>
                                        <DataTable
                                        className='h-full'
                                        columns={columns}
                                        data={empData}
                                        pagination
                                        fixedHeader
                                        highlightOnHover
                                        responsive
                                        />
                                    </div>
                                
                                :
                                <div className=''>
                                    <p className='text-lg text-center '>There is no record to display</p>
                                </div>
                            }

                        </div>
                    </div>
                :
            <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
            }
        </>
    )
}

export default List