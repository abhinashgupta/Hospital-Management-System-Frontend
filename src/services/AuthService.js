import apiClient from "./api";

const API_URL = "/api/auth";

class AuthService {

  login(credentials) {
    return apiClient.post(`${API_URL}/login`, credentials);
  }


  signup(userData) {
    return apiClient.post(`${API_URL}/signup`, userData);
  }

  logout() {
    return apiClient.post(`${API_URL}/logout`);
  }
}

export default new AuthService();
