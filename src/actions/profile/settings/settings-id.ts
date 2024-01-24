import axios from "axios";

export const ProfileSettings = async ({id, username, newId}: {id: string, username?: string, newId?: string}) => {
  if (username) {
    return axios.patch(`/api/profile/${id}/settings`, {username});
  }

  return axios.patch(`/api/profile/${id}/settings`, {newId});
};