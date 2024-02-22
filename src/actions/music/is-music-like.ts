import axios from "axios";

export const isMusicLike = async (userId: string, songId: string) => {
  return axios.get(`/api/profile/${userId}/song/${songId}`)
    .then(res => res.data);
};