import axios from "axios";

export const ChatAdd = async (userId: string, receiverId: string) => {
  return axios.post(`/api/profile/${userId}/chat`, {receiverId});
};