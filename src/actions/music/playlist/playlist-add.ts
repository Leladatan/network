import axios from "axios";
import {Music} from "@prisma/client";

export const PlaylistAdd = async (userId: string, values: {title: string, photo: string}, songs: Music[]) => {
  const songsId: string[] = songs.map(song => song.id);

  return axios.post(`/api/profile/${userId}/playlist`, {...values, songsId});
};