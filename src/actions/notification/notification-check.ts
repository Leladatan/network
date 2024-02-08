import axios from "axios";

export const notificationCheck = async (profileId: string, notificationId: string) => {
  return axios.post(`/api/profile/${profileId}/notification`, {notificationId});
};