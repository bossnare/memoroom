import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from 'axios';

//creation d'instance axios
const api: AxiosInstance = axios.create();

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // check if the request is for login
    const isLogin = config.url?.includes('/auth/login');

    if (!isLogin) {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('access_token')
          : null; //apetraka type foana
      // if (token && config.headers) {
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    }

    // if use cookies
    // credentials
    // config.withCredentials = true;

    // base URL
    config.baseURL = import.meta.env.VITE_API_URL!;

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default api;
