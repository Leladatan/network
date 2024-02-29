import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const DELETE = async (req: Request, {params}: { params: { profileId: string, messageId: string } }) => {
  try {
    const userId: string = params.profileId;
    const messageId: string = params.messageId;

    const message = await db.message.findFirst({
      where: {
        id: messageId,
        authorId: userId,
      },
    });

    if (!message) {
      return new NextResponse("Message not found", {status: 404});
    }

    await db.message.delete({
      where: {
        id: messageId,
        authorId: userId,
      },
    });

    return NextResponse.json(message);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 400});
  }
};