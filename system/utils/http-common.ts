import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

http.interceptors.request.use(
  (config) => {
    const s = localStorage.getItem('auth');
    const auth = s ? JSON.parse(s) : null;
    const access_token = auth ? auth.access_token : null;
    if(access_token && !config.headers.Authorization){
      config.headers!.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const win: Window = window;
    const status = error.response?.status || 500;
    if (status === 401) {
      win.location = win.location.protocol + '//' + win.location.host + '/login';
    }
    return Promise.reject(error);
  },
);

export {
  http,
}