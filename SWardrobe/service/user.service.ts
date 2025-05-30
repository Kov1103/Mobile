import api from "@/middleware/auth";
import { AxiosResponse } from "axios";

export const getUser = async (id: number): Promise<AxiosResponse<any, any>> => {
  try {
    return await api.get(`/users/${id}`);
  } catch (error) {
    throw error;
  }
};
