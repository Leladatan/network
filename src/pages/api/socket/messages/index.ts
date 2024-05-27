import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import {NextApiResponseServerIO} from "@/types/socket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, photo, receiverId, userId } = req.body;
    const { chatId} = req.query;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID missing" });
    }

    if (!message) {
      return res.status(400).json({ error: "Content missing" });
    }

    const chat = await db.chat.findFirst({
      where: {
        id: chatId as string,
      }
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const message_create = await db.message.create({
      data: {
        chatId: chatId as string,
        message,
        photo: photo ? photo : null,
        receiverId,
        authorId: userId,
      },
    });

    const channelKey: string = `chat:${chatId}:messages`;

    res.socket.server.io.emit(channelKey, message_create);

    return res.status(200).json(message_create);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}