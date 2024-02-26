import axios from "axios";

export const getMusicList = async (userId: string) => {
  return axios.get(`/api/profile/${userId}/song`).then(res => res.data);
};