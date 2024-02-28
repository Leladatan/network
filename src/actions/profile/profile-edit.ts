import axios from "axios";
import {
  TypeOf,
  ZodDate,
  ZodObject,
  ZodOptional,
  ZodString,
} from "zod";

export const ProfileEdit = async (id: string, values: TypeOf<ZodObject<{
  birthday: ZodOptional<ZodDate>;
  gender: ZodString;
  about: ZodString;
  last_name: ZodString;
  first_name: ZodString
}>>) => {
  return axios.patch(`/api/profile/${id}`, {...values});
};