import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const userId: string = params.profileId;
    const {notificationId} = await req.json();

    if (!notificationId) {
      return new NextResponse("Notification ID is required", {status: 400});
    }

    const notification = await db.notification.update({
      where: {
        id: notificationId,
        userId
      },
      data: {
        checked: true
      }
    });

    return NextResponse.json(notification);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};