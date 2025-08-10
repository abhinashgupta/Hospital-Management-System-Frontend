import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Import all components and pages
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import DoctorList from "./components/DoctorList";
import DoctorForm from "./components/DoctorForm"; // <-- Import DoctorForm
import PatientDashboard from "./components/PatientDashboard";
import HomeRedirect from "./components/HomeRedirect";
import ProtectedRoute from "./components/ProtectedRoute";

const UnauthorizedPage = () => (
  <div className="text-center mt-5">
    <h1>403 - Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
  </div>
);

function App() {
  return (
    <>
      {" "}
      {/* No Router here */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<HomeRedirect />} />

          {/* --- PROTECTED ROUTES (DOCTORS/ADMINS) --- */}
          <Route
            element={<ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]} />}
          >
            <Route path="/patients" element={<PatientList />} />
            <Route path="/add-patient" element={<PatientForm />} />
            <Route path="/edit-patient/:id" element={<PatientForm />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/add-doctor" element={<DoctorForm />} />
            <Route path="/edit-doctor/:id" element={<DoctorForm />} />
          </Route>

          {/* --- PROTECTED ROUTES (PATIENTS) --- */}
          <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
            <Route path="/dashboard" element={<PatientDashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
