import axios from "axios";

export const AlbumAdd = async (userId: string, values: {photo: string, name: string}) => {
  return axios.post(`/api/profile/${userId}/album`, values);
};