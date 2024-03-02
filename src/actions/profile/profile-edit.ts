import axios from "axios";
import {
  ZodString,
} from "zod";

export const ProfileEdit = async (id: string, values: {
  birthday: Date | null;
  gender: ZodString["_output"];
  about: ZodString["_output"];
  last_name: ZodString["_output"];
  first_name: ZodString["_output"]
}) => {
  return axios.patch(`/api/profile/${id}`, {...values});
};