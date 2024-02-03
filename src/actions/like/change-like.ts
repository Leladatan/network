import axios from "axios";

export const ChangeLike = async (postId: string, {action, userId, authorId}: {action: "like" | "dislike", userId: string, authorId: string}) => {
  return axios.patch(`/api/post/${postId}/like`, {action, userId, authorId});
};