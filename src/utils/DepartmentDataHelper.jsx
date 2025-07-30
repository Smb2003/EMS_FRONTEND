import axios from "axios";
import { useNavigate } from "react-router-dom"

export const columns = [
    {
		name: 'S.NO',
		selector: row => row.sno,
        sortable: true,
	},
	{
		name: 'DEPARTMENT',
		selector: row => row.name,
	},
    {
		name: 'ACTION',
		selector: row => row.action,
        button: true,
        allowOverflow: true,
        width:'150px'
	},
]

export const DepartmentActions = ({id,setRefresh}) =>{
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/department_delete/${id}`,{
                withCredentials: true
            });
            console.log(response.data.data);
            setRefresh(prev => !prev);
            // navigate('/admin_dashboard/departmentList')
        } catch (error) {
            console.log("error: ",error);
        }
    }
    return(
        <div className="flex flex-wrap space-x-2">
            <button 
            className="bg-green-600 rounded px-2 py-2 text-white cursor-pointer"
            onClick={()=>{navigate(`/admin_dashboard/departmentList/${id}`)}}
            >
                Edit
            </button>
            <button className="bg-red-600 rounded px-2 py-2 text-white cursor-pointer" onClick={handleClick}>Delete</button>
        </div>
    )
}