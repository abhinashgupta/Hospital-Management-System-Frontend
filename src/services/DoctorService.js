import apiClient from "./api";

const API_URL = "/api/v1/doctors"; // <-- CORRECTED PATH

class DoctorService {
  createDoctor(doctorData) {
    return apiClient.post(API_URL, doctorData);
  }

  getAllDoctors() {
    return apiClient.get(API_URL);
  }

  getDoctorById(doctorId) {
    return apiClient.get(`${API_URL}/${doctorId}`);
  }

  updateDoctor(doctorId, doctorData) {
    return apiClient.put(`${API_URL}/${doctorId}`, doctorData);
  }

  deleteDoctor(doctorId) {
    return apiClient.delete(`${API_URL}/${doctorId}`);
  }
}

export default new DoctorService();
