import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";

export const getChatsWithSearch = async (userId: string, search?: string): Promise<ChatWithUserAndReceiver[]> => {
  if (search) {
    const chats: ChatWithUserAndReceiver[] = await db.chat.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: exclude("user", ["password"]),
        },
        receiver: {
          select: exclude("user", ["password"]),
        },
        messages: {
          take: 1,
        }
      },
    });

    return chats.filter(item => item.receiver.username.includes(search));
  }

  return db.chat.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: exclude("user", ["password"]),
      },
      receiver: {
        select: exclude("user", ["password"]),
      },
      messages: {
        take: 1,
      }
    },
  });
};