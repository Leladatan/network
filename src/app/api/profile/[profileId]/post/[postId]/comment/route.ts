import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: { params: { profileId: string, postId: string } }) => {
  try {
    const authorId: string = params.profileId;
    const postId: string = params.postId;
    const {title, userId} = await req.json();

    if (!authorId) {
      return new NextResponse("Author is required", {status: 401});
    }

    if (!title) {
      return new NextResponse("Title is required", {status: 400});
    }

    if (!postId) {
      return new NextResponse("Post ID is required", {status: 400});
    }

    const comment = await db.comment.create({
      data: {
        title,
        authorId,
        postId
      }
    });

    if (userId !== authorId) {
      await db.notification.create({
        data: {
          userId,
          subject_userId: authorId,
          type: "comment_add"
        }
      });
    }

    return NextResponse.json(comment);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};