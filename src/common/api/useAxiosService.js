import axios from "axios";
import { useAuthContext } from "../../features/auth/AuthContext.js";

export default function useAxiosService() {
  const { jwt } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
  });

  axiosInstance.interceptors.request.use((config) => {
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  });

  return axiosInstance;
}
