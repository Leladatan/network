import axios from "axios";
import {Music} from "@prisma/client";

export const PlaylistEdit = async (userId: string, playlistId: string, values: {title: string, photo: string}, songs: Music[]) => {
  const musicsId: string[] = songs.map(song => song.id);

  return axios.patch(`/api/profile/${userId}/playlist/${playlistId}`, {...values, musicsId});
};