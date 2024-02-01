import axios from "axios";

export const ProfilePostDelete = async (userId: string, postId: string) => {
  return axios.delete(`/api/profile/${userId}/post/${postId}`);
};