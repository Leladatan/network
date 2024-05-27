import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const DELETE = async (req: Request, {params}: {params: {profileId: string, chatId: string}}) => {
  try {
    const userId: string = params.profileId;
    const chatId: string = params.chatId;

    const chat = await db.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return new NextResponse("Chat not found", {status: 404});
    }

    await db.message.deleteMany({
      where: {
        authorId: userId,
        receiverId: chat.receiverId,
      },
    });

    await db.chat.delete({
      where: {
        id: chatId,
        userId,
      },
    });

    return NextResponse.json(chat);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 400});
  }
};

export const PATCH = async (req: Request, {params}: {params: {profileId: string, chatId: string}}) => {
  try {
    const userId: string = params.profileId;
    const chatId: string = params.chatId;

    const {value} = await req.json();

    const chat = await db.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return new NextResponse("Chat not found", {status: 404});
    }

    await db.chat.update({
      where: {
        id: chatId,
      },
      data: {
        isPinned: value,
      },
    });

    return NextResponse.json(chat);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 400});
  }
};