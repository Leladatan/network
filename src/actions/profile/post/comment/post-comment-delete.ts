import axios from "axios";

export const PostCommentDelete = async (postId: string, commentId: string) => {
  return axios.delete(`/api/post/${postId}/comment/${commentId}`);
};