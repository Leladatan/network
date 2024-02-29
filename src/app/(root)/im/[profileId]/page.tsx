import Chat from "@/app/(root)/im/[profileId]/_components/chat";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/constants/auth";
import {redirect} from "next/navigation";
import {getMessagesForChatSearch} from "@/actions/chat/get-messages-for-chat-search";

const Page = async ({params, searchParams}: { params: { profileId: string }, searchParams: {search: string} }) => {
  const session = await getServerSession(authOptions);
  const chat: ChatWithUserAndReceiver | null = await getMessagesForChatSearch(session.user.id, params.profileId, searchParams.search);

  if (!chat) {
    redirect("/im");
  }

  return <Chat chat={chat} />;
};

export default Page;