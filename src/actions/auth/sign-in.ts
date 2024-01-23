import axios, {AxiosResponse} from "axios";

export const signIn = async (data: Record<never, string> | undefined): Promise<AxiosResponse> => {
  return axios.post("api/sign-in", data);
};