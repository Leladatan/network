import axios from "axios";

export const setOffline = async (id: string) => {
  return axios.patch(`/api/profile/${id}/offline`);
};