import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
    specialization: "",
    contactNumber: "", 
    age: "",
    gender: "",
    diagnosis: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      formData.role === "DOCTOR" &&
      (!formData.specialization.trim() || !formData.contactNumber.trim())
    ) {
      setError("Specialization and Contact Number are required for doctors.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await AuthService.signup(formData);
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="card-header text-center bg-success text-white">
          <h2>Create Account</h2>
        </div>
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="nameInput"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="emailInput"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="passwordInput"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="roleSelect" className="form-label">
                Register as
              </label>
              <select
                name="role"
                className="form-select"
                id="roleSelect"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
              </select>
            </div>

            {formData.role === "DOCTOR" && (
              <>
                <div className="mb-3">
                  <label htmlFor="specializationInput" className="form-label">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    className="form-control"
                    id="specializationInput"
                    value={formData.specialization}
                    onChange={handleChange}
                    required={formData.role === "DOCTOR"}
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactInput" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className="form-control"
                    id="contactInput"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required={formData.role === "DOCTOR"}
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {formData.role === "PATIENT" && (
              <>
                <div className="mb-3">
                  <label htmlFor="ageInput" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    id="ageInput"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genderInput" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                    id="genderInput"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </>
            )}

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
