import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const GET = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId: string = params.profileId;

    const music_list = await db.musicList.findMany({
      where: {
        userId,
      },
      include: {
        music: true,
      },
    });

    return NextResponse.json(music_list);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error");
  }
};