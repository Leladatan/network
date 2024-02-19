import axios from "axios";

export const ProfilePostEdit = async (userId: string, postId: string, title: string, photo: string | null | undefined) => {
  return axios.patch(`/api/profile/${userId}/post/${postId}`, {title, photo});
};