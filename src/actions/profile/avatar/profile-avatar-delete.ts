import axios from "axios";

export const ProfileAvatarDelete = async (id: string) => {
  return axios.delete(`/api/profile/${id}/avatar`);
};