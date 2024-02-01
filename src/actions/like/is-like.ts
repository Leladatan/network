import axios from "axios";

export const IsLikeLikedPost = async (userId: string, postId: string) => {
  const res = await axios.get(`/api/post/${postId}/like/${userId}`);
  return res.data;
};