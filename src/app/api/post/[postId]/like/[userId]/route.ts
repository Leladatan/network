import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Liked_Post} from "@prisma/client";

export const GET = async (req: Request, {params}: {params: {postId: string, userId: string}}) => {
  try {
    const postId: string = params.postId;
    const userId: string = params.userId;

    const liked_post: Liked_Post | null = await db.liked_Post.findFirst({
      where: {
        userId,
        postId
      }
    });

    if (!liked_post) {
      return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};