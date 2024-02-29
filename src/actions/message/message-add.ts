import axios from "axios";

export const MessageAdd = async (userId: string, values: {message: string, photo: string | null}, receiverId: string, chatId: string) => {
  return axios.post(`/api/profile/${userId}/message`, {...values, receiverId, chatId});
};