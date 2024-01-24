import axios from "axios";

export const ProfileDelete = async (id: string) => {
  return axios.delete(`/api/profile/${id}`);
};