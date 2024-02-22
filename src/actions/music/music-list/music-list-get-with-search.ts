import {db} from "@/lib/db";

export const MusicListGetWithSearch = async (userId: string, search: string) => {
  if (search) {
    const list = await db.musicList.findMany({
      where: {
        userId,
      },
      include: {
        music: true,
      },
    });

    return list.filter(song => song.music.title.includes(search));
  }

  return db.musicList.findMany({
    where: {
      userId,
    },
    include: {
      music: true,
    },
  });
};