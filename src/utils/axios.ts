import axios, { AxiosInstance } from "axios";
import md5 from "md5";
import { routePaths } from "./routePaths";
import { stringToHash } from "./stringToHash";

const CONFIG_BASE_URL = "https://no23.lavina.tech";

const localStorageState =
  JSON.parse(localStorage.getItem("register") as any) || null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: CONFIG_BASE_URL,
  headers: {},
});

// Update the request interceptor to calculate and set headers
axiosInstance.interceptors.request.use(
  (config) => {
    const { method, url, data } = config;

    config.headers["Content-Type"] = "application/json";

    if (url !== routePaths.signup()) {
      const hashString = stringToHash({
        method,
        url,
        data,
        secret: localStorageState?.secret || "",
      });
      const sign = md5(hashString).toString();
      config.headers.Sign = sign;
      config.headers.Key = localStorageState?.key;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
