import React, { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await DoctorService.getMyProfile();
        setDoctorData(response.data);
      } catch (err) {
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
  if (!doctorData) {
    return (
      <div className="alert alert-warning mt-4">No doctor profile found.</div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome, Dr. {doctorData.name}!</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-info text-white">
              <h3>Your Profile</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> Dr. {doctorData.name}
              </p>
              <p>
                <strong>Specialization:</strong> {doctorData.specialization}
              </p>
              <p>
                <strong>Contact:</strong> {doctorData.contactNumber || "N/A"}
              </p>
            </div>
            <div className="card-footer">
              <Link
                to={`/edit-doctor/${doctorData.id}`}
                className="btn btn-secondary"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <p>Manage patient and hospital records.</p>
              <Link to="/patients" className="btn btn-primary">
                View All Patients
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
