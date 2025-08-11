import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const HomeRedirect = () => {
  const { isAuthenticated, userRole } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  if (userRole === "DOCTOR" || userRole === "ADMIN") {
    return <Navigate to="/doctor-dashboard" />;
  } else if (userRole === "PATIENT") {
    return <Navigate to="/dashboard" />;
  } else {
    return <div>Loading...</div>;
  }
};

export default HomeRedirect;
