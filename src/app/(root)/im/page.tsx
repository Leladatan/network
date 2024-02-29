import MessagesPage from "@/app/(root)/im/_components";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/constants/auth";
import {Chat, Message, User} from "@prisma/client";
import {exclude} from "@/lib/exclude";
import {getChatsWithSearch} from "@/actions/chat/get-chats-with-search";

export type ChatWithUserAndReceiver = Chat & {
  user: Omit<User, "password">;
  receiver: Omit<User, "password">;
  messages: Message[];
};

const Page = async ({searchParams}: { searchParams: { search: string } }) => {
  const session = await getServerSession(authOptions);
  const chats: ChatWithUserAndReceiver[] = await getChatsWithSearch(session.user.id, searchParams.search);

  return <MessagesPage chats={chats}/>;
};

export default Page;