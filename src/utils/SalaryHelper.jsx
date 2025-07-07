export const columns = [
    {
        name: "SNO",
        selector: row => 1,
    },
    {
        name: "NAME",
        selector: row => row.empData[0]?.name,
    },
    {
        name: "SALARY",
        selector: row => row.Salary[0]?.basicSalary,
    },
    {
        name: "ALLOWANCE",
        selector: row => row.Salary[0]?.allowance,
    },
    {
        name: "DEDUCTION",
        selector: row => row.Salary[0]?.deduction,
    },
    {
        name: "TOTAL",
        selector: row => row.Salary[0]?.netSalary,
    },
    {
        name: "PAY DATE",
        selector: row => row.Salary[0]?.payDate,
    },
]