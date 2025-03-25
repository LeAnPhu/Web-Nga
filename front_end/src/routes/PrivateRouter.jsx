import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  console.log("PrivateRoute - Authenticated:", isAuthenticated);
  console.log("PrivateRoute - User Role:", user?.role);
  console.log("PrivateRoute - Allowed Roles:", allowedRoles);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRouter;
