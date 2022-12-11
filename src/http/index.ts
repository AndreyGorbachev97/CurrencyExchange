import axios from "axios";
import { API_URL } from "../config";
import jwtDecode from "jwt-decode";

// import {AuthResponse} from "../models/response/AuthResponse";
// import {store} from "../index";
// import {IUser} from "../models/IUser";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const accessTokenStr = token ? JSON.parse(token) : "";
  // console.log("accessToken", accessToken);
  config.headers.Authorization = `Bearer ${accessTokenStr}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default $api;
