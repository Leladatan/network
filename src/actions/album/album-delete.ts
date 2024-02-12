import axios from "axios";

export const AlbumDelete = async (userId: string, albums: string[]) => {
  const requests = albums.map(item => axios.delete(`/api/profile/${userId}/album/${item}`));

  return Promise.all([requests]);
};