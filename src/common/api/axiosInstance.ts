import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  const language = localStorage.getItem("languageTag");
  if (language) {
    config.headers.AcceptLanguage = language;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error Occurred in Request: ", error);
    throw error.response.data;
  },
);

export default axiosInstance;
