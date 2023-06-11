import { AxiosResponse } from "axios";

import { axiosInstance } from "../utils/axios";

import { RegisterData } from "../components/Register/constants/registerInterfaces";

export const postRegister = (
  { email, name, secret }: RegisterData,
  extraData: any
): Promise<AxiosResponse> => {
  return axiosInstance.post(
    "/signup",
    { email, key: name, name, secret },
    extraData
  );
};

export const getMe = (): Promise<AxiosResponse> => {
  return axiosInstance.get("/myself");
};
