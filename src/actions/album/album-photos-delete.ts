import axios from "axios";

export const AlbumPhotosDelete = async (userId: string, photos: string[]) => {
  const requests = photos.map(item => axios.delete(`/api/profile/${userId}/photo/${item}`));

  return Promise.all([requests]);
};