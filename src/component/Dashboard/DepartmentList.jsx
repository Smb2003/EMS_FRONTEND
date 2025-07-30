import React, { use, useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { getAuth } from '../../context/AuthContext'
import DataTable from 'react-data-table-component';
import { columns, DepartmentActions } from '../../utils/DepartmentDataHelper';
import axios from 'axios';
import "../../App.css"
const DepartmentList = () => {
const [loading,setLoading] = useState(false);
const [dep_Data,setDep_Data] = useState([]);
const [searchedDep, setSearchedDep] = useState("");
const [refresh, setRefresh] = useState(false);
const {department,addDepartment} =  getAuth();

const makingData = (data) => {
  const result = data?.map((item,index)=>{
    return(
      {...item,
      sno:index+1,
      name: item.name?.toUpperCase(),
      action: <DepartmentActions id={item._id} setRefresh={setRefresh} />
    }
    )
  })
  setDep_Data(result);
}
useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/department_get", {
        withCredentials: true
      });

      const data = response?.data?.data || [];

      if (response?.data?.statusCode === 200) {
        if (!searchedDep || searchedDep.trim() === "") {
          addDepartment(data);
          makingData(data);
        } else {
            const filtered = data.filter((item) =>
            item.name?.toUpperCase().includes(searchedDep.toUpperCase())
          );
          makingData(filtered);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setLoading(true);
    }
  };

  fetchDepartments();
}, [refresh, searchedDep]);


return (
  <>
  { !loading ?
    <div className='flex flex-col md:py-5 py-15 px-3'>
      <h3 className='text-2xl text-center font-bold mb-3'>Manage Departments</h3>
      <SearchBar setIsSearchedDep={setRefresh} setSearchedDep={setSearchedDep} setLoading={setLoading} label={"Add New Department"} inputLabel={"Search By Department"}/>
      {
        department.length > 0 ?
          <div className='mt-4 flex flex-wrap md:w-cal[100vw-350px] w-full overflow-x-auto'>
            <DataTable
            columns={columns}
            data={dep_Data}
            pagination
            responsive
            />
          </div>
        :
        <div className='text-center mt-5'>
          <h5>
            There is no record to display.
          </h5>
        </div>
      }
    </div>
    :
    <div className='h-screen flex flex-wrap justify-center items-center '><span className="loader"></span></div>
  }
  </>

)}

export default DepartmentList;