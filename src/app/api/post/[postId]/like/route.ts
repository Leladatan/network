import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Liked_Post, Post} from "@prisma/client";

export const PATCH = async (req: Request, {params}: {params: {postId: string}}) => {
  try {
    const id: string = params.postId;
    const {action, userId, authorId} = await req.json();

    if (!action) {
      return new NextResponse("Action type required", {status: 400});
    }

    if (action === "like") {
      const post: Post = await db.post.update({
        where: {
          id
        },
        data: {
          likes: {
            increment: 1
          }
        }
      });

      if (!post) {
        return new NextResponse("Post not found", {status: 404});
      }

      await db.liked_Post.create({
        data: {
          userId,
          postId: id
        }
      });

      if (authorId !== userId) {
        await db.notification.create({
          data: {
            userId: authorId,
            subject_userId: userId,
            type: "like_add"
          }
        });
      }

      return NextResponse.json(post);
    }

    const post: Post = await db.post.update({
      where: {
        id
      },
      data: {
        likes: {
          decrement: 1
        }
      }
    });

    if (!post) {
      return new NextResponse("Post not found", {status: 404});
    }

    const liked_post: Liked_Post | null = await db.liked_Post.findFirst({
      where: {
        userId,
        postId: id
      }
    });

    if (!liked_post) {
      return new NextResponse("Liked post not found", {status: 404});
    }

    await db.liked_Post.delete({
      where: {
        id: liked_post.id,
        userId,
        postId: id
      }
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};