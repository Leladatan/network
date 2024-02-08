import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Friend} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId: string = params.profileId;
    const {friendId} = await req.json();

    if (!friendId) {
      return new NextResponse("Friend ID is required", {status: 400});
    }

    const subscriber = await db.subscriber.findFirst({
      where: {
        userId: friendId,
        subscriberId: userId
      }
    });

    if (!subscriber) {
      return new NextResponse("Subscriber not found", {status: 404});
    }

    await db.subscriber.delete({
      where: {
        id: subscriber.id,
      }
    });

    const friend: Friend = await db.friend.create({
      data: {
        userId,
        friendId
      }
    });

    await db.notification.create({
      data: {
        userId,
        subject_userId: friendId,
        type: "friend_add"
      }
    });

    await db.friend.create({
      data: {
        userId: friendId,
        friendId: userId
      }
    });

    await db.notification.create({
      data: {
        userId: friendId,
        subject_userId: userId,
        type: "friend_add"
      }
    });

    return NextResponse.json(friend);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};