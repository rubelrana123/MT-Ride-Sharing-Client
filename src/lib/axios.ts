 
import config from '@/config';
import axios from 'axios';
console.log(config.BASE_URL, "config");
export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials : true,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  // },
  
});
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("Axios", config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
//   { synchronous: true, runWhen: () =>
//     //  /* This function returns true */
//     }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
