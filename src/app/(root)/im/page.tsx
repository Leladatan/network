import MessagesPage from "@/app/(root)/im/_components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/constants/auth";
import {Chat, Message, User} from "@prisma/client";
import {getChatsWithSearch} from "@/actions/chat/get-chats-with-search";

export type ChatWithUserAndReceiver = Chat & {
  user: Omit<User, "password">;
  receiver: Omit<User, "password">;
  messages: Message[];
};

const Page = async ({searchParams}: { searchParams: { search: string } }) => {
  const session = await getServerSession(authOptions);
  let chats: ChatWithUserAndReceiver[] = await getChatsWithSearch(session.user.id, searchParams.search);

  const pinned_chats = chats.filter(chat => chat.isPinned);
  chats = chats.filter(chat => !chat.isPinned);
  
  return <MessagesPage chats={chats} pinned_chats={pinned_chats}/>;
};

export default Page;