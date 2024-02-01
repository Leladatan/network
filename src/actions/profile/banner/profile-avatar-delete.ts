import axios from "axios";

export const ProfileBannerDelete = async (id: string) => {
  return axios.delete(`/api/profile/${id}/banner`);
};