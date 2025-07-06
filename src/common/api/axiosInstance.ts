import axios from "axios";
import { UserPreferences, UserSignInResponse } from "../models/userModels";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const { jwt } = JSON.parse(user) as UserSignInResponse;
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }

  const preferences = localStorage.getItem("preferences");
  if (preferences) {
    const { languageCode } = JSON.parse(preferences) as UserPreferences;
    if (languageCode) {
      config.headers.AcceptLanguage = languageCode;
    }
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
