import axios from "axios";

export const ProfileAvatar = async (id: string, values: {avatar: string}) => {
  return await axios.post(`/api/profile/${id}/avatar`, values);
};