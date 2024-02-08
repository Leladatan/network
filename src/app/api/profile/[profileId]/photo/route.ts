import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Photo, Post} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId: string = params.profileId;
    const {values} = await req.json();
    const {photos} = values;

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    if (!photos) {
      return new NextResponse("Photo is required", {status: 400});
    }

    const photo = await db.photo.create({
      data: {
        userId,
        photo: photos
      }
    });

    return NextResponse.json(photo);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};