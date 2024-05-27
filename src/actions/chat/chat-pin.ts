import axios from "axios";

export const chatPin = async ({userId, chatId, value}: { userId: string, chatId: string, value: boolean }) => {
  return axios.patch(`/api/profile/${userId}/chat/${chatId}`, {value});
};