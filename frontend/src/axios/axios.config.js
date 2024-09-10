import axios from 'axios';

const defaultToken = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

const axiosInstance = axios.create({
  baseURL: 'https://neuzy.onrender.com/api/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${defaultToken}`
 
  },
});


 axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] =`Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 
 

// Making a request using the instance
/* axiosInstance.get('/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error fetching data:', error)); */

export default axiosInstance ;
