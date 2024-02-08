import axios from "axios";

export const FriendDelete = async (userId: string, friendId: string) => {
  return axios.delete(`/api/profile/${userId}/friend/${friendId}`);
};