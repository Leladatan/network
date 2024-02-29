import axios from "axios";

export const MessageDelete = async (userId: string, messageId: string) => {
  return axios.delete(`/api/profile/${userId}/message/${messageId}`);
};