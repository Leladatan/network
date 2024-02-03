import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const DELETE = async (req: Request, {params}: {params: {postId: string, commentId: string}}) => {
  try {
    const postId: string = params.postId;
    const commentId: string = params.commentId;

    const comment = await db.comment.delete({
      where: {
        id: commentId,
        postId
      }
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const PATCH = async (req: Request, {params}: {params: {postId: string, commentId: string}}) => {
  try {
    const postId: string = params.postId;
    const commentId: string = params.commentId;
    const {title} = await req.json();

    if (!title) {
      return new NextResponse("Title is required", {status: 400});
    }

    const comment = await db.comment.update({
      where: {
        id: commentId,
        postId
      },
      data: {
        title
      }
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};