import React, { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch doctors from the service
  const fetchDoctors = () => {
    setLoading(true);
    DoctorService.getAllDoctors()
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors", error);
        setError(
          "Failed to fetch doctors. Please make sure the backend is running."
        );
        setLoading(false);
      });
  };

  // Fetch doctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to handle the deletion of a doctor
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor record?")) {
      DoctorService.deleteDoctor(id)
        .then(() => {
          // Refresh the list by filtering out the deleted doctor
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting doctor", error);
          // Optionally, display a more specific error message to the user
          setError("Failed to delete doctor. Please try again.");
        });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Doctors List</h2>
        <Link to="/add-doctor" className="btn btn-primary">
          Add Doctor
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.contactNumber}</td>
                <td>
                  <Link
                    to={`/edit-doctor/${doctor.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No doctors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
