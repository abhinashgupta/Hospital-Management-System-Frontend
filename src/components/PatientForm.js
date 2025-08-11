import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PatientService from "../services/PatientService";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageTitle, setPageTitle] = useState("Add Patient");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setPageTitle("Edit Patient");

      const fetchPatientData = async () => {
        setLoading(true);
        try {
          const response = await PatientService.getPatientById(id);
          const patientData = response.data;

          const sanitizedData = {
            name: patientData.name || "",
            age: patientData.age || "",
            gender: patientData.gender || "",
            diagnosis: patientData.diagnosis || "",
          };
          setPatient(sanitizedData);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch patient data.");
        } finally {
          setLoading(false);
        }
      };

      fetchPatientData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (id) {
        await PatientService.updatePatient(id, patient);
      } else {
        await PatientService.createPatient(patient);
      }
      navigate("/patients"); 
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="text-center mt-5">Loading Patient Data...</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-header text-center bg-primary text-white">
          <h2>{pageTitle}</h2>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={patient.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={patient.age}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={patient.gender}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="diagnosis" className="form-label">
                Diagnosis
              </label>
              <textarea
                className="form-control"
                id="diagnosis"
                name="diagnosis"
                rows="3"
                value={patient.diagnosis}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/patients")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Patient"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
