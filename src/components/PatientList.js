import React, { useState, useEffect } from "react";
import PatientService from "../services/PatientService";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await PatientService.getAllPatients();
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patient data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this patient record?")
    ) {
      PatientService.deletePatient(id)
        .then(() => {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.id !== id)
          );
        })
        .catch((err) => {
          setError("Failed to delete patient. Please try again.");
        });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Patients...</h4>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Patients List</h2>
        <Link to="/add-patient" className="btn btn-primary">
          Add New Patient
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
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Diagnosis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.diagnosis}</td>
                      <td>
                        <Link
                          to={`/edit-patient/${patient.id}`}
                          className="btn btn-info btn-sm me-2 mb-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="btn btn-danger btn-sm mb-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No patients found.
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

export default PatientList;
