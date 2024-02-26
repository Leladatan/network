import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Playlist} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId: string = params.profileId;
    const {title, photo, songsId} = await req.json();

    if (!title) {
      return new NextResponse("Title is required", {status: 400});
    }

    if (!photo) {
      return new NextResponse("Photo is required", {status: 400});
    }

    const playlist: Playlist = await db.playlist.create({
      data: {
        title,
        photo,
        userId,
      },
    });

    for (const item of songsId) {
      await db.cringe.create({
        data: {
          musicId: item,
          playlistId: playlist.id,
        },
      });
    }

    return NextResponse.json(playlist);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error");
  }
};