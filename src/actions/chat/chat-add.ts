import axios from "axios";
import {Chat} from "@prisma/client";

export const ChatAdd = async (userId: string, receiverId: string): Promise<Chat> => {
  return axios.post(`/api/profile/${userId}/chat`, {receiverId}).then(res => res.data);
};