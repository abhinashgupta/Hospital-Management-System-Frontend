import React, { useState, useEffect } from "react";
import PatientService from "../services/PatientService";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await PatientService.getMyProfile();
        setPatientData(response.data);
      } catch (err) {
        console.error("Failed to fetch patient profile:", err);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h2>Loading Your Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!patientData) {
    return (
      <div className="alert alert-warning mt-4">No patient profile found.</div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome, {patientData.name}!</h1>

      <div className="row">
        {/* Profile Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3>Your Profile</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> {patientData.name}
              </p>
              <p>
                <strong>Age:</strong> {patientData.age || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {patientData.gender || "N/A"}
              </p>
              <p>
                <strong>Current Diagnosis:</strong>{" "}
                {patientData.diagnosis || "None"}
              </p>
            </div>
            <div className="card-footer">
              <Link
                to={`/edit-patient/${patientData.id}`}
                className="btn btn-secondary"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Placeholder for Appointments */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white">
              <h3>My Appointments</h3>
            </div>
            <div className="card-body">
              <p>Appointment functionality coming soon.</p>
              <button className="btn btn-success" disabled>
                View Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
