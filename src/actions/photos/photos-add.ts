import axios from "axios";

export const PhotosAdd = async (userId: string, values: {photos: string} ) => {
  return axios.post(`/api/profile/${userId}/photo`, {values});
};