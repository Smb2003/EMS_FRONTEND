import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({setIsSearchedDep,setSearchedDep,setLoading,label,inputLabel}) => {
    const [depName,setDepName]= useState("");
    const navigate = useNavigate();
    const NaviagteToAddNewDepartmentForm = () => {
        if(inputLabel.includes("Employee")){
            navigate("/admin_dashboard/employee/add_Employee");
        }
        else if(inputLabel.includes("Status")){
            navigate("/emp_dashboard/leave/addForm");
        }
        else{
            navigate("/admin_dashboard/add_newDepartmentForm");
        }
    }
    const handleChange = (e) => {
        const name = e.target.value;
        setDepName(name);
        console.log(depName)
        setSearchedDep(name);
        setIsSearchedDep(false);
        setLoading(false);
    }
    return (
        <div className='mt-6 px-5 py-2 space-y-2 flex justify-between flex-wrap'>
            <input 
            type="text" 
            name="name" 
            id="name" 
            value={depName}
            placeholder={inputLabel}
            autoComplete='off'
            className='py-2 px-2 h-14 md:h-20 sm:h-20 rounded shadow-lg w-30 sm:w-58 md:w-68 bg-white'
            onChange={handleChange}
            />
            <button className='border bg-teal-600 shadow text-white hover:bg-teal-700 cursor-pointer px-2 rounded' onClick={NaviagteToAddNewDepartmentForm}>{label}</button>
        </div>
    )
}

export default SearchBar