import axios from 'axios';

const authorToken = localStorage.getItem('authorToken')
const authorAxiosInstance =axios.create({
  baseURL: 'https://neuzy-backend.vercel.app/api/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${authorToken}`
 
  },
});

authorAxiosInstance.interceptors.request.use(
    (config) => {
      if (authorToken) {
        config.headers['Authorization'] =`Bearer ${authorToken}`; // Attach the token to the Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  export default authorAxiosInstance
