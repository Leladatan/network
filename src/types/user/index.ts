import {Subscriber, Liked_Post, GenderType} from "@prisma/client";

export type User = {
  id: string;
  email: string;
  status?: string;
  online?: boolean;
  username: string;
  avatar?: string | null;
  banner?: string | null;
  first_name?: string;
  last_name?: string;
  gender?: GenderType;
  birthday?: Date;
  about?: string;
  likes?: number;
  liked?: Liked_Post[];
  subscribers?: Subscriber[];
  createdAt?: Date;
  updateAt?: Date;
};