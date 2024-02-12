import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Album} from "@prisma/client";

export const PATCH = async (req: Request, {params}: {params: { profileId: string, albumId: string}}) => {
  try {
    const albumId: string = params.albumId;
    const userId: string = params.profileId;
    const {name} = await req.json();

    if (!name) {
      return new NextResponse("Name is required", {status: 400});
    }

    const album = await db.album.update({
      where: {
        id: albumId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(album);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const POST = async (req: Request, {params}: {params: { profileId: string, albumId: string}}) => {
  try {
    const albumId: string = params.albumId;
    const userId: string = params.profileId;
    const {photos} = await req.json();

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    if (!photos) {
      return new NextResponse("Photo is required", {status: 400});
    }

    const album = await db.album.findUnique({
      where: {
        id: albumId,
        userId,
      },
      include: {
        photos: true
      }
    });

    if (!album) {
      return new NextResponse("Album not found", {status: 404});
    }

    const photo = await db.photo.create({
      data: {
        userId,
        photo: photos,
        albumId
      }
    });

    const photos_new = [...album.photos, photo];

    const album_new = await db.album.update({
      where: {
        id: albumId,
        userId,
      },
      data: {
        photos: {
          set: photos_new
        }
      }
    });

    return NextResponse.json(album_new);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const DELETE = async (req: Request, {params}: { params: { profileId: string, albumId: string } }) => {
  try {
    const userId: string = params.profileId;
    const albumId: string = params.albumId;

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    if (!albumId) {
      return new NextResponse("Album is required", {status: 400});
    }

    const album: Album | null = await db.album.findFirst({
      where: {
        id: albumId,
        userId,
      }
    });

    if (!album) {
      return new NextResponse("Album not found", {status: 404});
    }

    await db.photo.deleteMany({
      where: {
        userId,
        albumId
      }
    });

    await db.album.deleteMany({
      where: {
        id: albumId,
        userId,
      },
    });

    return NextResponse.json(album);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};