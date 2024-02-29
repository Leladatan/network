import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request, {params}: { params: { profileId: string } }) => {
  try {
    const {receiverId} = await req.json();
    const userId: string = params.profileId;

    const chat_find = await db.chat.findFirst({
      where: {
        userId,
        receiverId,
      },
    });

    if (!chat_find) {
      const chat = await db.chat.create({
        data: {
          userId,
          receiverId,
        },
      });

      return NextResponse.json(chat);
    }

    return NextResponse.json(chat_find);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};