import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Photo} from "@prisma/client";

export const DELETE = async (req: Request, {params}: { params: { profileId: string, photoId: string } }) => {
  try {
    const userId: string = params.profileId;
    const photoId: string = params.photoId;

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    if (!photoId) {
      return new NextResponse("Photo is required", {status: 400});
    }

    const photo: Photo = await db.photo.delete({
      where: {
        id: photoId,
        userId,
      },
    });

    return NextResponse.json(photo);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};