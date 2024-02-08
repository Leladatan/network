import axios from "axios";

export const ProfileSubscriberAdd = async (id: string, currentUserId: string) => {
  return axios.post(`/api/profile/${id}/subscriber`, {currentUserId});
};