import axios, { AxiosInstance } from "axios";

const CONFIG_BASE_URL = "https://no23.lavina.tech";

const localStorageState =
  JSON.parse(localStorage.getItem("register") as any) || null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: CONFIG_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    Key: localStorageState?.name,
    Sign: "eaa2ffd1527f5b07960771d3e713ac30",
  },
});
