import axios from "axios";

export const ChangeLike = async (postId: string, {action, userId}: {action: "like" | "dislike", userId: string}) => {
  return axios.patch(`/api/post/${postId}/like`, {action, userId});
};