import {NextResponse} from "next/server";
import {Photo, User} from "@prisma/client";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const {banner} = await req.json();
    const id: string = params.profileId;

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!banner) {
      return new NextResponse("Banner is required", {status: 400});
    }

    const photo: Photo | null = await db.photo.findFirst({
      where: {
        userId: id,
        type: "banner",
      },
    });

    if (!photo) {
      await db.photo.create({
        data: {
          photo: banner,
          userId: id,
          type: "banner"
        }
      });

      const user: User = await db.user.update({
        where: {
          id
        },
        data: {
          banner
        }
      });

      return NextResponse.json(user);
    }

    const user: User = await db.user.update({
      where: {
        id
      },
      data: {
        banner
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
        photo: banner,
        userId: id,
        type: "banner"
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
        banner: null
      }
    });

    await db.photo.deleteMany({
      where: {
        userId: id,
        type: "banner",
      }
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", {status: 500});
  }
};