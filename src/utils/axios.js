// src/utils/axiosInstance.js
import axios from "axios";

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // Add other default headers here
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    // For example, you can add an authorization token:
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the 403 error, e.g., redirect to login page
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default api;
