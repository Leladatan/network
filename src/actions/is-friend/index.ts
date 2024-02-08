import axios from "axios";

export const isFriendThisUser = async (userId: string, currentUserId: string) => {
  return axios.get(`/api/profile/${userId}/friend/${currentUserId}`);
};

export const IsSubscriberThisUser = async (userId: string, currentUserId: string) => {
  return axios.get(`/api/profile/${userId}/subscriber/${currentUserId}`);
};