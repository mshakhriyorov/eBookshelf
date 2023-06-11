import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";

export const postBook = (
  { isbn }: { isbn: string },
  extraData: any
): Promise<AxiosResponse> => {
  return axiosInstance.post("/books", { isbn }, extraData);
};

export const getBooks = (extraData: any): Promise<AxiosResponse> => {
  return axiosInstance.get("/books", extraData);
};

export const editBook = (
  { id, status }: { id: number; status: number },
  extraData: any
): Promise<AxiosResponse> => {
  return axiosInstance.patch(`/books/${id}`, { status }, extraData);
};

export const deleteBook = (
  { id }: { id: number },
  extraData: any
): Promise<AxiosResponse> => {
  return axiosInstance.delete(`/books/${id}`, extraData);
};
