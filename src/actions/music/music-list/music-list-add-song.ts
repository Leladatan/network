import axios from "axios";

export const MusicListAddSong = async (userId: string, songId: string) => {
  return axios.post(`/api/profile/${userId}/song/${songId}`);
};