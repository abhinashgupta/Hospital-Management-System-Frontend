import apiClient from "./api"; // Import the configured apiClient from api.js

// THIS IS THE CRUCIAL PART: Define the full, correct path
const API_URL = "/api/v1/patients";

class PatientService {
  /**
   * Retrieves a list of all patients.
   * This will call GET http://localhost:8080/api/v1/patients
   */
  getAllPatients() {
    return apiClient.get(API_URL);
  }

  /**
   * Creates a new patient record.
   * @param {object} patientData - The patient's information.
   */
  createPatient(patientData) {
    return apiClient.post(API_URL, patientData);
  }

  /**
   * Retrieves a single patient by their ID.
   * @param {number} patientId - The ID of the patient.
   */
  getPatientById(patientId) {
    return apiClient.get(`${API_URL}/${patientId}`);
  }

  /**
   * Updates an existing patient's record.
   * @param {number} patientId - The ID of the patient to update.
   * @param {object} patientData - The new information for the patient.
   */
  updatePatient(patientId, patientData) {
    return apiClient.put(`${API_URL}/${patientId}`, patientData);
  }

  /**
   * Deletes a patient by their ID.
   * @param {number} patientId - The ID of the patient to delete.
   */
  deletePatient(patientId) {
    return apiClient.delete(`${API_URL}/${patientId}`);
  }

  getMyProfile() {
    return apiClient.get(`${API_URL}/me`);
  }
}

export default new PatientService();
