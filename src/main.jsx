import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios';

// Base URL configuration
axios.defaults.baseURL = 'http://localhost:8080'; // Update with your Spring Boot server URL

// Request interceptor
axios.interceptors.request.use(
  config => {
    // You can add authentication headers here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle common errors
    if (error.response) {
      console.error('Request failed:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);
createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <App />
</BrowserRouter>
    
)
