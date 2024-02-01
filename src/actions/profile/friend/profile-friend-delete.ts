import axios from "axios";

export const ProfileSubscriberDelete = async (id: string, currentUserId: string) => {
  return axios.delete(`/api/profile/${id}/subscriber/${currentUserId}`);
};