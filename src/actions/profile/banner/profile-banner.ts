import axios from "axios";

export const ProfileBanner = async (id: string, values: {banner: string}) => {
  return await axios.post(`/api/profile/${id}/banner`, values);
};