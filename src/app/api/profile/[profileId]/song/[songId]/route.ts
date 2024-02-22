import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: {params: {profileId: string, songId: string}}) => {
  try {
    const userId: string = params.profileId;
    const musicId: string = params.songId;

    const music_list = await db.musicList.create({
      data: {
        userId,
        musicId,
      },
    });

    return NextResponse.json(music_list);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const DELETE = async (req: Request, {params}: {params: {profileId: string, songId: string}}) => {
  try {
    const userId: string = params.profileId;
    const musicId: string = params.songId;

    const music_list = await db.musicList.findFirst({
      where: {
        userId,
        musicId,
      }
    });

    if (!music_list) {
      return new NextResponse("Song not found", {status: 404});
    }

    await db.musicList.delete({
      where: {
        id: music_list.id,
      }
    });

    return NextResponse.json(music_list);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const GET = async (req: Request, {params}: {params: {profileId: string, songId: string}}) => {
  try {
    const userId: string = params.profileId;
    const musicId: string = params.songId;

    const music_list = await db.musicList.findFirst({
      where: {
        userId,
        musicId,
      }
    });

    if (!music_list) {
      return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};
