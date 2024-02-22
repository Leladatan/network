import {db} from "@/lib/db";

export const MusicMainGetWithSearch = async (search: string) => {
  if (search) {
    return db.music.findMany({
      where: {
        title: {
          contains: search,
        },
      },
    });
  }

  return db.music.findMany();
};