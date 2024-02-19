import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Post} from "@prisma/client";

export const DELETE = async (req: Request, {params}: {params: {profileId: string, postId: string}}) => {
  try {
    const userId: string = params.profileId;
    const postId: string = params.postId;

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!postId) {
      return new NextResponse("Not found post", {status: 404});
    }

    const post = await db.post.deleteMany({
      where: {
        id: postId,
        userId
      }
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const PATCH = async (req: Request, {params}: {params: {profileId: string, postId: string}}) => {
  try {
    const userId: string = params.profileId;
    const postId: string = params.postId;

    const {title, photo} = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!postId) {
      return new NextResponse("Not found post", {status: 404});
    }

    if (photo) {
      await db.photo.create({
        data: {
          photo,
          userId,
          type: "post",
        },
      });
    }

    const post: Post = await db.post.update({
      where: {
        id: postId,
        userId
      },
      data: {
        title,
        isEdited: true,
        updateAt: new Date(),
        photo: photo ? photo : null,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};