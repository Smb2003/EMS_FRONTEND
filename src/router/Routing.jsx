import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoutes from './ProtectedRoutes';
import AdminDashboard from '../pages/AdminDashboard';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import AdminRoute from './AdminRoutes';
import AdminSummary from '../component/Dashboard/AdminSummary';
import DepartmentList from '../component/Dashboard/DepartmentList';
import AddNewDepartmentForm from '../component/Dashboard/AddNewDepartmentForm';
import EditDepartmentForm from '../component/Dashboard/EditDepartmentForm';
import List from '../component/Employee/List';
import AddEmployee from '../component/Employee/AddEmployee';
import EditEmployee from '../component/Employee/EditEmployee';
import EmployeeInfo from '../component/Employee/EmployeeInfo';
import ManageSalary from '../component/Salary/ManageSalary';
import SalarIyInfo from '../component/Employee/SalarIyInfo';
import EmployeeSummary from '../component/Employee/EmployeeSummary';
import LeaveManagement from '../component/Employee/LeaveManagement';
import AddLeaveForm from '../component/Employee/AddLeaveForm';
import Setting from '../component/Dashboard/Setting';
import Leave from '../component/Dashboard/Leave'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/emp_dashboard" element={<EmployeeDashboard />}>
            <Route index element={<EmployeeSummary />} />
            <Route path='viewInfo/:id' element={<EmployeeInfo />} />
            <Route path='salary/:id' element={<SalarIyInfo />} />
            <Route path='leave' element={<LeaveManagement  />} />
            <Route path='leave/addForm' element={<AddLeaveForm />} />
            <Route path='setting' element={<Setting />} />
        </Route> 

        <Route element={<AdminRoute />}>
          <Route path="/" element={<Navigate to="/admin_dashboard" />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminSummary />} />
            <Route path='departmentList' element={<DepartmentList />} />
            <Route path='add_newDepartmentForm' element={<AddNewDepartmentForm />} />
            <Route path='departmentList/:id' element={<EditDepartmentForm />} />
            <Route path='employee' element={<List />} />
            <Route path='employee/add_Employee' element={<AddEmployee />} />
            <Route path='employee/edit_Employee/:id' element={<EditEmployee />} />
            <Route path='employee/viewInfo/:id' element={<EmployeeInfo />} />
            <Route path='salary' element={<ManageSalary />} />
            <Route path='salary/:id' element={<SalarIyInfo />} />
            <Route path='setting' element={<Setting />} />
            <Route path='leave' element={<Leave  />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
