import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Subscriber} from "@prisma/client";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;
    const {currentUserId} = await req.json();

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!currentUserId) {
      return new NextResponse("Not found user for add subscriber", {status: 404});
    }

    const subscriber: Subscriber = await db.subscriber.create({
      data: {
        userId: currentUserId,
        subscriberId: id
      }
    });

    return NextResponse.json(subscriber);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};