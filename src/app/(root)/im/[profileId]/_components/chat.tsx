"use client";

import ChatHeader from "@/app/(root)/im/[profileId]/_components/chat-header";
import ChatFooter from "@/app/(root)/im/[profileId]/_components/chat-footer";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import ChatMessage from "@/app/(root)/im/[profileId]/_components/chat-message";
import {useRouter} from "next/navigation";

const Chat = ({chat}: {chat: ChatWithUserAndReceiver}) => {
  const router = useRouter();

  if (!chat) {
    router.push("/im");
    return;
  }
  
  return (
    <div className="relative flex flex-col gap-y-4 w-full">
      <ChatHeader receiver={chat.receiver} userId={chat.user.id} chatId={chat.id}/>
      {!!chat.messages.length ?
        <div className="flex flex-col items-center justify-end gap-y-3 h-full pb-28">
          {chat.messages.map(item => (
            <ChatMessage key={item.id} message={item} user={chat.user} receiver={chat.receiver}/>
          ))}
        </div>
        :
        <h3 className="pb-28">Messages not found</h3>
      }
      <ChatFooter chat={chat}/>
    </div>
  );
};

export default Chat;