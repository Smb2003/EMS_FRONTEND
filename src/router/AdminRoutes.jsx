// components/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = getAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "Admin") return <Navigate to="/emp_dashboard" />;

  return <Outlet />;
};

export default AdminRoute;
