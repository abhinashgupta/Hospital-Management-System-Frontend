import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", 
});

// uses an interceptor to include the JWT token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token"); 
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
