import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";

export const POST = async (req: Request) => {
  try {
    const {skip, userId} = await req.json();

    if (!userId) {
      return new NextResponse("userId is required", {status: 400});
    }

    const friends = await db.friend.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          select: exclude("user", ["password"]),
        },
      }
    });

    const postsFromFriends = await db.post.findMany({
      where: {
        authorId: {
          in: friends.map(friend => friend.friend.id)
        },
      },
      include: {
        author: {
          select: exclude("user", ["password"]),
        },
        comments: {
          include: {
            author: {
              select: exclude("user", ["password"]),
            },
          },
        },
      },
    });

    const postsFromFriendsTake = await db.post.findMany({
      where: {
        authorId: {
          in: friends.map(friend => friend.friend.id)
        },
      },
      include: {
        author: {
          select: exclude("user", ["password"]),
        },
        comments: {
          include: {
            author: {
              select: exclude("user", ["password"]),
            },
          },
        },
      },
      skip,
      take: 2,
    });

    const subscriptions = await db.subscriber.findMany({
      where: {
        userId,
      },
      include: {
        subscriber: {
          select: exclude("user", ["password"]),
        },
      },
    });

    const postsFromSubscription = await db.post.findMany({
      where: {
        authorId: {
          in: subscriptions.map(subscription => subscription.subscriber.id)
        },
      },
      include: {
        author: {
          select: exclude("user", ["password"]),
        },
        comments: {
          include: {
            author: {
              select: exclude("user", ["password"]),
            },
          },
        },
      },
    });

    const postsFromSubscriptionTake = await db.post.findMany({
      where: {
        authorId: {
          in: subscriptions.map(subscription => subscription.subscriber.id)
        },
      },
      include: {
        author: {
          select: exclude("user", ["password"]),
        },
        comments: {
          include: {
            author: {
              select: exclude("user", ["password"]),
            },
          },
        },
      },
      skip,
      take: 2,
    });

    const posts: PostWithUser[] = [...postsFromFriendsTake, ...postsFromSubscriptionTake];
    const total: number = postsFromFriends.length + postsFromSubscription.length;

    const data = {
      items: posts,
      total,
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};