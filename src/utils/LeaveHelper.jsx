export const columns = [
    {
        name:"SNO",
        selector: (row,index) => index+1,
        sortable: true,
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
        selector: row => row?.status?.toUpperCase()
    },
    
]

