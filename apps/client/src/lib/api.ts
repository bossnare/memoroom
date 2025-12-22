import { supabase } from '@/services/supabase.service';
import { type Session } from '@supabase/supabase-js';
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

//creation d'instance axios
const api: AxiosInstance = axios.create();
let currentSession: Session | null = null;

async function initSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  currentSession = session;
  //  on auth change
  supabase.auth.onAuthStateChange((_event, session) => {
    currentSession = session;
  });
}

initSession();

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // check if the request is for login
    // const isLogin = config.url?.includes('/auth/login');

    // if (!isLogin) {
    //   const token =
    //     typeof window !== 'undefined'
    //       ? localStorage.getItem('access_token')
    //       : null; //apetraka type foana
    //   // if (token && config.headers) {
    //   (
    //     config.headers as Record<string, string>
    //   ).Authorization = `Bearer ${token}`;
    // }

    const token = currentSession?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
