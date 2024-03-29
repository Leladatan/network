import axios from "axios";

export const ProfilePostAdd = async (id: string, post: {title: string, userId: string, authorId: string, photo: string}) => {
  return axios.post(`/api/profile/${id}/post`, post);
};