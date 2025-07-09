import axios from "axios";
import { SiOrcid } from "react-icons/si"

export const columns = [
    {
        name:"SNO",
        selector: (row,index) => index+1,
        sortable: true,
    },
    {
        name: "NAME",
        selector: row => row?.name?.toUpperCase(),
    },
    {
        name: "LEAVE TYPE",
        selector: row => row?.leaveType?.toUpperCase(),
    },
    {
        name: "START DATE",
        selector: row => row?.startDate,
    },
    {
        name: "END DATE",
        selector: row => row?.endDate,
    },
    {
        name: "APPLIED AT",
        selector: row => row?.appliedOn?.substring(0,10),
    },
    {
        name: "STATUS",
        selector: row => row?.status?.toUpperCase(),
    },
     {
        name: "ACTIONS",
        selector: row => row?.actions,
        allowOverflow: true,
        button: true,
        width: "150px",
        
    },
    
]

export const LeaveDataActions = ({leaveID,setRefresh}) => {
    console.log(leaveID)
    const handleClick = async (e) => {
        e.preventDefault();
        const status= e.target.value;
        try {
            const response = await axios.put("https://4bc4f03e-6724-4328-9524-a9a1108eeb02-00-2lbhj86on536i.pike.replit.dev/api/v1/users/leave_update", {leaveID,status},{
                withCredentials: true,
            })
            console.log(response);
            if(response?.data?.statusCode === 200){
                console.log("Leave updated successfully");
                setRefresh(prev => !prev);
            } else {
                console.log("Failed to update leave: ", response?.data?.message);
            }
        } catch (error) {
            console.log("Error in LeaveDataActions: ", error?.response?.data?.message || "Something went wrong");
        }
    }
    return (    
        <div>
            <button className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 focus:scale-95" value={"Approved"} onClick={handleClick}> 
                Approve
            </button>
            <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 ml-2 focus:scale-95" value={"Rejected"} onClick={handleClick}>
                Reject
            </button>
        </div>
    )
}