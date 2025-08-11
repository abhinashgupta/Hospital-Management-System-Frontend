import React, { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    setLoading(true);
    DoctorService.getAllDoctors()
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch doctors. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor record?")) {
      DoctorService.deleteDoctor(id)
        .then(() => {
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== id)
          );
        })
        .catch((error) => {
          setError("Failed to delete doctor. Please try again.");
        });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Doctors...</h4>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Doctors List</h2>
        <Link to="/add-doctor" className="btn btn-primary">
          Add Doctor
        </Link>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
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
                          className="btn btn-info btn-sm me-2 mb-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="btn btn-danger btn-sm mb-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
