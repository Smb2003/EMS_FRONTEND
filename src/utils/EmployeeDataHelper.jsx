import axios from "axios"
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S.NO",
        selector: row => row.sno,
        sortable: true
    },
    {
        name: "PHOTO",
        selector: row => row.employee.map((data,index)=>(<img key={index} src={data?.profileImage} className='rounded-full object-cover size-full w-12 h-18 py-2'/>))
    },
    {
        name: "NAME",
        selector: row => row.employee.map(data=>data.name.toUpperCase())
    },
    {
        name: "EMAIL",
        selector: row => row.employee.map(data=>data.email)
    },
    {
        name: "DATE OF BIRTH",
        selector: row => row.dob,
        // hide: "lg"
    },
    {
        name: "MARTIAL STATUS",
        selector: row => row.martialStatus.toUpperCase(),
        // hide:"lg"
    },
     {
        name: "SALARY",
        selector: row => row.salary
    },
     {
        name: "DESIGNATION",
        selector: row => row.designation.toUpperCase()
    },
    {
        name: "ACTIONS",
        selector: row => row.actions,
        allowOverflow: true,
        button: true,
        width:"230px"
    },
]


export const fetchDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/users/department_get", {
            withCredentials: true
        });
        if(response?.data?.statusCode == 200){
            let fetchData = response?.data?.data;
            return fetchData;
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/users/employee_get", {
            withCredentials: true
        });
        if(response?.data?.statusCode == 200){
            let fetchData = response?.data?.data;
            return fetchData;
        }
    } catch (error) {
        console.log(error)
    }
}

export const EmployeeActions = ({id,setRefresh}) => {
    const navigate = useNavigate();
    
    const handleDeleteBtn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/users/employee_delete/${id}`,{
                withCredentials: true
            });
            if(response?.data?.statusCode == 200){
                setRefresh(prev => !prev);
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    return (
        <div className="flex gap-2">
            <button className="px-2 py-2 bg-purple-700 text-white rounded cursor-pointer focus:scale-95 hover:bg-purple-900" onClick={()=>{navigate(`/admin_dashboard/employee/viewInfo/${id}`)}}>View</button>
            <button className="px-2 py-2 bg-green-500 text-white rounded cursor-pointer focus:scale-95 hover:bg-green-600" onClick={()=>{navigate(`/admin_dashboard/employee/edit_Employee/${id}`)}}>Edit</button>
            <button className="px-2 py-2 bg-yellow-500 text-white rounded cursor-pointer focus:scale-95 hover:bg-yellow-600" onClick={()=>{navigate(`/admin_dashboard/salary/${id}`)}}>Salary</button>
            <button className="px-2 py-2 bg-red-500 text-white rounded cursor-pointer focus:scale-95 hover:bg-red-600" onClick={handleDeleteBtn}>Delete</button>
            {/* <button></button> */}

        </div>
    )
}