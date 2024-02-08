import axios from "axios";

export const FriendAdd = async (userId: string, friendId: string) => {
  return axios.post(`/api/profile/${userId}/friend`, {friendId});
};