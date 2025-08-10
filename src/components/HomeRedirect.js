import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- CORRECTED IMPORT PATH

const HomeRedirect = () => {
  const { isAuthenticated, userRole } = useAuth(); // Use the stateful hook

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Based on the user's role, send them to the correct dashboard
  if (userRole === "DOCTOR" || userRole === "ADMIN") {
    return <Navigate to="/patients" />;
  } else if (userRole === "PATIENT") {
    return <Navigate to="/dashboard" />;
  } else {
    // This can happen briefly during re-renders, show a loading state
    return <div>Loading...</div>;
  }
};

export default HomeRedirect;
