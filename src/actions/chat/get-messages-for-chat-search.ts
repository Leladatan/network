import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";

export const getMessagesForChatSearch = async (userId: string, receiverId: string, search: string) => {
  if (search) {
    const chat: ChatWithUserAndReceiver | null = await db.chat.findFirst({
      where: {
        userId,
        receiverId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        receiver: {
          select: exclude("user", ["password"]),
        },
        user: {
          select: exclude("user", ["password"]),
        },
      }
    });

    if (!chat) {
      return null;
    }

    const messages = chat.messages.filter(item => item.message.includes(search));

    return {...chat, messages};
  }

  return db.chat.findFirst({
    where: {
      userId,
      receiverId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      receiver: {
        select: exclude("user", ["password"]),
      },
      user: {
        select: exclude("user", ["password"]),
      },
    }
  });
};