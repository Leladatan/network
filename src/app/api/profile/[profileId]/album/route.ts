import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Album} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId = params.profileId;
    const {photo, name} = await req.json();

    if (!photo) {
      return new NextResponse("Photo is required", {status: 400});
    }

    if (!name) {
      return new NextResponse("Name is required", {status: 400});
    }

    const album: Album = await db.album.create({
      data: {
        name,
        userId,
      }
    });

    const find: Album | null = await db.album.findFirst({
      where: {
        name,
        userId,
      }
    });

    if (!find) {
      return new NextResponse("wtf", {status: 404});
    }

    await db.photo.create({
      data: {
        userId,
        photo,
        albumId: find.id,
      }
    });

    return NextResponse.json(album);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};