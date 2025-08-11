import apiClient from "./api"; 

const API_URL = "/api/v1/patients";

class PatientService {

  getAllPatients() {
    return apiClient.get(API_URL);
  }

  createPatient(patientData) {
    return apiClient.post(API_URL, patientData);
  }

  getPatientById(patientId) {
    return apiClient.get(`${API_URL}/${patientId}`);
  }


  updatePatient(patientId, patientData) {
    return apiClient.put(`${API_URL}/${patientId}`, patientData);
  }

 
  deletePatient(patientId) {
    return apiClient.delete(`${API_URL}/${patientId}`);
  }

  getMyProfile() {
    return apiClient.get(`${API_URL}/me`);
  }
}

export default new PatientService();
