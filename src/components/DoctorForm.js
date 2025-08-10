import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DoctorService from "../services/DoctorService";

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageTitle, setPageTitle] = useState("Add Doctor");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setPageTitle("Edit Doctor");
      setLoading(true);
      DoctorService.getDoctorById(id)
        .then((response) => {
          const docData = response.data;
          const sanitizedData = {
            name: docData.name || "",
            specialization: docData.specialization || "",
            contactNumber: docData.contactNumber || "",
          };
          setDoctor(sanitizedData);
        })
        .catch((err) => setError("Failed to fetch doctor data."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (id) {
        await DoctorService.updateDoctor(id, doctor);
      } else {
        await DoctorService.createDoctor(doctor);
      }
      navigate("/doctors");
    } catch (err) {
      setError("Failed to save doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="text-center mt-5">Loading Doctor Data...</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-header text-center bg-info text-white">
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
                value={doctor.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <input
                type="text"
                className="form-control"
                id="specialization"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                value={doctor.contactNumber}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Link to="/doctors" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Doctor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
