import axios from "axios";

export const IsSubscriberThisUser = async (userId: string, currentUserId: string) => {
  return axios.get(`/api/profile/${userId}/subscriber/${currentUserId}`);
};