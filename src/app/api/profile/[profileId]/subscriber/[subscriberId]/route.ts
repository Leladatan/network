import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Subscriber} from "@prisma/client";

export const DELETE = async (req: Request, {params}: {params: {profileId: string, subscriberId: string}}) => {
  try {
    const subscriberId: string = params.profileId;
    const userId: string = params.subscriberId;

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!subscriberId) {
      return new NextResponse("Not found user for delete subscriber", {status: 404});
    }

    const subscriber: Subscriber | null = await db.subscriber.findFirst({
      where: {
        userId,
        subscriberId
      }
    });

    if (!subscriber) {
      return new NextResponse("Subscriber not found", {status: 404});
    }

    const subscriber_delete: Subscriber = await db.subscriber.delete({
      where: {
        id: subscriber.id
      }
    });

    return NextResponse.json(subscriber_delete);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const GET = async (req: Request, {params}: {params: {profileId: string, subscriberId: string}}) => {
  try {
    const subscriberId: string = params.profileId;
    const userId: string = params.subscriberId;

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!subscriberId) {
      return new NextResponse("Not found user for delete subscriber", {status: 404});
    }

    if (userId === subscriberId) {
      return NextResponse.json("The authorized user is on his page");
    }

    const subscriber: Subscriber | null = await db.subscriber.findFirst({
      where: {
        userId,
        subscriberId,
      }
    });

    if (subscriber) {
      return NextResponse.json(true);
    }

    return NextResponse.json(false);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};