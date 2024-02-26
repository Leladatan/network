import {NextResponse} from "next/server";
import {Photo, User} from "@prisma/client";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const {avatar} = await req.json();
    const id: string = params.profileId;

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    const photo: Photo | null = await db.photo.findFirst({
      where: {
        userId: id,
        type: "avatar",
      },
    });

    if (!photo) {
      await db.photo.create({
        data: {
          photo: avatar,
          userId: id,
          type: "avatar"
        }
      });

      const user: User = await db.user.update({
        where: {
          id
        },
        data: {
          avatar
        }
      });

      return NextResponse.json(user);
    }

    const user: User = await db.user.update({
      where: {
        id
      },
      data: {
        avatar
      }
    });

    await db.photo.update({
      where: {
        id: photo.id,
        userId: id,
      },
      data: {
        type: null
      }
    });

    await db.photo.create({
      data: {
        photo: avatar,
        userId: id,
        type: "avatar"
      }
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const DELETE = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    const user: User = await db.user.update({
      where: {
        id
      },
      data: {
        avatar: "https://utfs.io/f/9c52e5e6-ccc9-42ee-9a67-af8a3329a746-uao75v.jpg"
      }
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", {status: 500});
  }
};