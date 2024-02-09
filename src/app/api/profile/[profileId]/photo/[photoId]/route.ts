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

    const photo: Photo | null = await db.photo.findFirst({
      where: {
        id: photoId,
        userId,
      }
    });

    if (!photo) {
      return new NextResponse("Photo not found", {status: 404});
    }

    await db.photo.deleteMany({
      where: {
        id: photoId,
        userId,
      },
    });

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        photos: true
      }
    });

    if (!user) {
      return new NextResponse("User not found", {status: 404});
    }

   if (photo.type === "avatar") {
     await db.user.update({
       where: {
         id: userId,
       },
       data: {
         avatar: !!user.photos.length ?
           user.photos.filter(item => item.photo !== user.avatar)[0].photo :
           "https://utfs.io/f/9c52e5e6-ccc9-42ee-9a67-af8a3329a746-uao75v.jpg",
       }
     });
   }

    if (photo.type === "banner") {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          banner: null,
        }
      });
    }

    return NextResponse.json(photo);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};