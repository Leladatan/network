import axios from "axios";

export const AlbumEdit = async (userId: string, albumId: string, values: {name: string}) => {
  return axios.patch(`/api/profile/${userId}/album/${albumId}`, values);
};