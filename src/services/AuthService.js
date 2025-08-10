import apiClient from "./api";

const API_URL = "/api/auth"; // The endpoint for authentication

class AuthService {
  /**
   * Sends user credentials to the login endpoint.
   * @param {object} credentials - { email, password }
   * @returns {Promise<AxiosResponse<any>>} The response containing the JWT.
   */
  login(credentials) {
    return apiClient.post(`${API_URL}/login`, credentials);
  }

  /**
   * Sends new user information to the signup endpoint.
   * @param {object} userData - { name, email, password, role, specialization? }
   * @returns {Promise<AxiosResponse<any>>} The response containing the JWT.
   */
  signup(userData) {
    return apiClient.post(`${API_URL}/signup`, userData);
  }

  logout() {
    // No need to send data, the token is in the header via the interceptor
    return apiClient.post(`${API_URL}/logout`);
  }
}

export default new AuthService();
