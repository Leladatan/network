import axios from "axios";

export const ChatDelete = async (userId: string, chatId: string) => {
  return axios.delete(`/api/profile/${userId}/chat/${chatId}`);
};