import axios from "axios";

export const getFeed = async (userId: string, skip: number) => {
  return axios.post("/api/feed", {skip, userId}).then(res => res.data);
};