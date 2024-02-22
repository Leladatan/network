import axios from "axios";

export const MusicListDeleteSong = async (userId: string, songId: string) => {
  return axios.delete(`/api/profile/${userId}/song/${songId}`);
};