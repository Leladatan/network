import axios from "axios";

export const MusicAdd = async (values: {title: string, author: string, photo: string}, song: string) => {
  return axios.post("/api/music", {values, song});
};