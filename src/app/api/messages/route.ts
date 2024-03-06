import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/constants/auth";
import {Message} from "@prisma/client";
import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";

const MESSAGES_BATCH = 50;

export const GET = async (req: Request) => {
  try {
    const profile = await getServerSession(authOptions);
    const {searchParams} = new URL(req.url);

    const cursor = searchParams.get("cursor") as string;
    const chatId = searchParams.get("chatId");

    if (!profile) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!chatId) {
      return new NextResponse("Chat ID missing", {status: 400});
    }

    const total = await db.message.findMany({
      where: {
        chatId,
      },
    });

    let messages: Message[];

    if (cursor) {
      let skip: number = +cursor * 10;
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip,
        where: {
          chatId,
        },
        include: {
          chat: true,
          author: {
            select: exclude("user", ["password"]),
          },
          receiver: {
            select: exclude("user", ["password"]),
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          chatId
        },
        include: {
          chat: true,
          author: {
            select: exclude("user", ["password"]),
          },
          receiver: {
            select: exclude("user", ["password"]),
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }

    return NextResponse.json({
      items: messages,
      total: total.length,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};