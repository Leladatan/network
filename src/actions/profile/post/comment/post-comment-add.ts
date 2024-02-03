import axios from "axios";

export const PostCommentAdd = async (id: string, postId: string, {title, userId}: {title: string, userId: string}) => {
  return axios.post(`/api/profile/${id}/post/${postId}/comment`, {title, userId});
};