import Chat from "@/app/(root)/im/[profileId]/_components/chat";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import {redirect} from "next/navigation";
import {getMessagesForChatSearch} from "@/actions/chat/get-messages-for-chat-search";

const Page = async ({params, searchParams}: { params: { profileId: string }, searchParams: { search: string } }) => {
  const chat: ChatWithUserAndReceiver | null = await getMessagesForChatSearch(params.profileId, searchParams.search);

  if (!chat) {
    redirect("/im");
  }

  return <Chat
    chatId={chat.id}
    receiver={chat.receiver}
    user={chat.user}
    apiUrl={"/api/messages"}
    paramKey={"chatId"}
    paramValue={chat.id}
    socketUrl={"/api/socket/messages"}
    socketQuery={{chatId: chat.id}}
    chat={chat}
  />;
};

export default Page;