import axios from "axios";

export const AlbumPhotosAdd = async (userId: string, albumId: string, values: {photos: string}) => {
  return axios.post(`/api/profile/${userId}/album/${albumId}`, values);
};