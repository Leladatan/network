import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Post} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;
    const {title, userId, authorId} = await req.json();

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!title) {
      return new NextResponse("Title is required", {status: 400});
    }

    if (!authorId) {
      return new NextResponse("Author ID is required", {status: 400});
    }

    const post: Post = await db.post.create({
      data: {
        title,
        authorId,
        userId,
      }
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};