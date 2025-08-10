import axios from "axios";

// Create a new instance of axios with a custom configuration
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Base URL for all API calls
});

// Add a request interceptor to include the JWT token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token"); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
