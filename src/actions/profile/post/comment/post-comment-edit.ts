import axios from "axios";

export const PostCommentEdit = async (postId: string, commentId: string, title: string) => {
  return axios.patch(`/api/post/${postId}/comment/${commentId}`, {title});
};