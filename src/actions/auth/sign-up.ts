import axios, {AxiosResponse} from "axios";
import {SignUp} from "@/types/auth";

export const signUp = async (data: SignUp): Promise<AxiosResponse> => {
  return axios.post<SignUp>("api/sign-up", data);
};