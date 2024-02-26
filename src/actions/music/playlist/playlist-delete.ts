import axios from "axios";

export const PlaylistDelete = async (userId: string, playlistId: string) => {
  return axios.delete(`/api/profile/${userId}/playlist/${playlistId}`);
};