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
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        }
      },
    });

    const chats_receiver: ChatWithUserAndReceiver[] = await db.chat.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        user: {
          select: exclude("user", ["password"]),
        },
        receiver: {
          select: exclude("user", ["password"]),
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        }
      },
    });

    const first = chats.filter(item => item.receiver.username.includes(search));
    const second = chats_receiver.filter(item => item.user.username.includes(search));

    return [...first, ...second];
  }

  const chats = await db.chat.findMany({
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
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      }
    },
  });

  const chats_receiver = await db.chat.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      user: {
        select: exclude("user", ["password"]),
      },
      receiver: {
        select: exclude("user", ["password"]),
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      }
    },
  });

  return [...chats, ...chats_receiver];
};