import React, { useEffect, useState } from 'react'
import { MdGroups } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import SummaryCard from './SummaryCard';
import { IoDocumentText } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { GiSandsOfTime } from "react-icons/gi";
import { FaTimesCircle } from "react-icons/fa";
import axios from 'axios';
const AdminSummary = () => {
const [department, setDepartment] = useState([]);
const [employee, setEmployee] = useState([]);
const [allLeave, setAllLeave] = useState([]);
const [pendingLeave, setPendingLeave] = useState([]);
const [issuedLeave, setIssuedLeave] = useState([]);
const [rejectedLeave, setRejectedLeave] = useState([]);
const [salary, setSalary] = useState(0);
useEffect(() => {
  axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/department_get", {
    withCredentials: true
  })
  .then(res => {
    const data = res?.data?.data;
    if (data) {
      setDepartment(data);
    }
  })
  .catch(err => {
    console.log("Dashboard fetch error", err);
  });
}, []);

useEffect(() => {
  axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/employee_get", {
    withCredentials: true
  })
  .then(res => {
    const data = res?.data?.data;
    if (data) {
      setEmployee(data);
    }
  })
  .catch(err => {
    console.log("Dashboard fetch error", err);
  });
}, []);

useEffect(() => {
  axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/leave_get", {
    withCredentials: true
  })
  .then(res => {
    const data = res?.data?.data;
    if (data) {
      const Leaves = data?.flatMap(item => item?.Employee);
      const pending = Leaves?.filter(leave => leave.status === "Pending");
      const issued = Leaves?.filter(leave => leave.status === "Approved");
      const rejected = Leaves?.filter(leave => leave.status === "Rejected");  
      setAllLeave(Leaves);
      setPendingLeave(pending);
      setIssuedLeave(issued); 
      setRejectedLeave(rejected);
    }
  })
  .catch(err => {
    console.log("Dashboard fetch error", err);
  });
}, []);

useEffect(() => {
  axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/salary_allGet", {
    withCredentials: true
  })
  .then(res => {
    const data = res?.data?.data;
    if (res?.data?.statusCode == 200) {
      const totalSalary = data?.reduce((acc, curr)=> acc + curr.netSalary, 0);
      setSalary(totalSalary)
    }
  })
  .catch(err => {
    console.log("Dashboard fetch error", err);
  });
}, []);

const summaryData = [
  {
    icon: <MdGroups size="30"/>,
    label:"Total Employees",
    number: employee?.length || 0,
    color: "bg-teal-700"
  },
  {
    icon: <FaBuilding size="30"/>,
    label:"Total Department",
    number: department.length || 0,
    color: "bg-yellow-600"
  },
  {
    icon: <FaMoneyBillWave size="30"/>,
    label:"Montly Pay",
    number: `PKR ${salary}`|| 0,
    color: "bg-red-700"
  },
]
  const leaveSummary = [
      {
        icon: <IoDocumentText size="30"/>,
        label:"Leave Applied",
        number: allLeave.length || 0,
        color: "bg-teal-700"
      },
      {
        icon: <GrStatusGood size="30"/>,
        label:"Leave Issued",
        number: issuedLeave.length || 0,
        color: "bg-green-700"
      },
      {
        icon: <GiSandsOfTime size="30"/>,
        label:"Leave Pending",
        number: pendingLeave.length || 0,
        color: "bg-yellow-600"
      },
      {
        icon: <FaTimesCircle size="30"/>,
        label:"Leave Rejected",
        number: rejectedLeave.length || 0,
        color: "bg-red-700"
      },
    ]
  return (
    <div className='pb-2'>
      <div className='px-4 py-5'>
          <h3 className='text-2xl p-2 font-bold'>Dashboard Overview</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            {
              summaryData && summaryData.map((item,index)=>{
                const {icon,label,number,color} = item;
                return (
                  <div key={index}>
                    <SummaryCard icon={icon} label={label} number={number} color={color}/>  
                  </div>
                )
              }) 
            }
          </div>
      </div>
      <div className='px-4 py-3 mt-10'>
          <h3 className='text-2xl p-2 text-center font-bold'>Leave Summary</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            {
              leaveSummary && leaveSummary.map((item,index)=>{
                const {icon,label,number,color} = item;
                return (
                  <div key={index}>
                    <SummaryCard icon={icon} label={label} number={number} color={color}/>  
                  </div>
                )
              }) 
            }
          </div>
      </div>
    </div>
  )
}

export default AdminSummary