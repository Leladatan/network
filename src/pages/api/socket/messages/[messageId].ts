import { NextApiRequest } from "next";
import {NextApiResponseServerIO} from "@/types/socket";
import {db} from "@/lib/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
): Promise<void> {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messageId, chatId, userId } = req.query;
    const { message, photo } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID missing" });
    }

    const chat = await db.chat.findFirst({
      where: {
        id: chatId as string,
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    let message_new = await db.message.findFirst({
      where: {
        id: messageId as string,
      },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (req.method === "DELETE") {
      message_new = await db.message.delete({
        where: {
          id: messageId as string,
        },
      });
    }

    if (req.method === "PATCH") {
      message_new = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          message,
          photo: photo ? photo : null
        },
      });
    }

    const updateKey: string = `chat:${chatId}:messages:update`;

    res.socket.server.io.emit(updateKey, message_new);

    return res.status(200).json(message_new);
  } catch (error) {
    console.log("[MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}