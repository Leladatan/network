import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Friend} from "@prisma/client";

export const GET = async (req: Request, {params}: {params: {profileId: string, friendId: string}})=> {
  try {
    const userId: string = params.profileId;
    const friendId: string = params.friendId;

    const friend = await db.friend.findFirst({
      where: {
        userId,
        friendId
      }
    });

    if (!friend) {
      return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const DELETE = async (req: Request, {params}: {params: {profileId: string, friendId: string}}) => {
  try {
    const userId: string = params.profileId;
    const friendId: string = params.friendId;

    const friend_delete: Friend | null = await db.friend.findFirst({
      where: {
        userId,
        friendId
      }
    });

    if (!friend_delete) {
      return new NextResponse("Friend not found", {status: 404});
    }

    await db.friend.delete({
      where: {
        id: friend_delete.id,
      }
    });

    const subject_friend_delete: Friend | null = await db.friend.findFirst({
      where: {
        userId: friendId,
        friendId: userId
      }
    });

    if (!subject_friend_delete) {
      return new NextResponse("Friend not found", {status: 404});
    }

    await db.friend.delete({
      where: {
        id: subject_friend_delete.id,
      }
    });

    await db.subscriber.create({
      data: {
        userId: friendId,
        subscriberId: userId
      }
    });

    return NextResponse.json(friend_delete);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};