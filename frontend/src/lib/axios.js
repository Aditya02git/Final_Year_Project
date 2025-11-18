import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Changed from https to http
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Optional: Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);