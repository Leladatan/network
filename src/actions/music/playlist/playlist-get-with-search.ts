import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";
import {PlaylistType} from "@/app/(root)/music/page";

export const PlaylistGetWithSearch = async (userId: string, search?: string) => {
  if (search) {
    const playlists: PlaylistType[] = await db.playlist.findMany({
      where: {
        userId,
      },
      include: {
        musics: {
          include: {
            music: true,
          },
        },
        user: {
          select: exclude("user", ["password"]),
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return playlists.filter(playlist => playlist.title.includes(search));
  }

  return db.playlist.findMany({
    where: {
      userId,
    },
    include: {
      musics: {
        include: {
          music: true,
        },
      },
      user: {
        select: exclude("user", ["password"]),
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};