import {Subscriber, Liked_Post} from "@prisma/client";

export type User = {
  id: string;
  email: string;
  status?: string;
  online?: boolean;
  username: string;
  avatar?: string | null;
  banner?: string | null;
  likes?: number;
  liked?: Liked_Post[];
  subscribers?: Subscriber[];
  createdAt?: Date;
  updateAt?: Date;
};