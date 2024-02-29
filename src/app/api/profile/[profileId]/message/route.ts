import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: { params: { profileId: string } }) => {
  try {
    const {message, photo, receiverId, chatId} = await req.json();
    const authorId: string = params.profileId;

    if (!message) {
      return new NextResponse("Message is required", {status: 400});
    }

    if (!receiverId) {
      return new NextResponse("Receiver ID is required", {status: 400});
    }

    if (!chatId) {
      return new NextResponse("Chat ID is required", {status: 400});
    }

    const message_add = await db.message.create({
      data: {
        photo: photo ? photo : null,
        message,
        receiverId,
        authorId,
        chatId,
      }
    });

    return NextResponse.json(message_add);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};