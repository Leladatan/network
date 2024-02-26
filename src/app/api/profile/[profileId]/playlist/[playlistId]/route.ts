import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const DELETE = async (req: Request, {params}: {params: {profileId: string, playlistId: string}}) => {
  try {
    const id: string = params.playlistId;
    const userId: string = params.profileId;

    await db.cringe.deleteMany({
      where: {
        playlistId: id,
      }
    });

    const playlist = await db.playlist.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.json(playlist);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const PATCH = async (req: Request, {params}: {params: {profileId: string, playlistId: string}}) => {
  try {
    const id: string = params.playlistId;
    const userId: string = params.profileId;


  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};