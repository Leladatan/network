import axios from "axios";

export const ProfileOptions = async (id: string, status: string) => {
  return axios.patch(`/api/profile/${id}/edit`, {status});
};