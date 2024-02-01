import axios from "axios";

export const ProfileEdit = async (id: string) => {
  return axios.patch(`/api/profile/${id}`);
};