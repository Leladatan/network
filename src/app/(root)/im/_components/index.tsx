"use client";

import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import {useSocket} from "@/providers/socket/socket-provider";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import ChatItem from "@/app/(root)/im/_components/chat/chat-item";
import Empty from "@/components/empty";

const MessagesPage = ({chats, pinned_chats}: {
  chats: ChatWithUserAndReceiver[],
  pinned_chats: ChatWithUserAndReceiver[]
}) => {
  const {isConnected} = useSocket();

  return (
    <div className="flex flex-col gap-y-2">
      <Box>
        <InputSearch name={"search"} placeholder={"Search..."}/>
      </Box>

      <Box>
        {isConnected ? <p className="text-emerald-500">Connect</p> : <p className="text-rose-500">Disconnect</p>}
      </Box>

      {!!pinned_chats.length &&
        <Box className="hover:bg-primary/15 transition">
          {pinned_chats.map(chat => (
            <ChatItem key={chat.id} chat={chat}/>
          ))}
        </Box>
      }

      {!!chats.length &&
        <Box className="hover:bg-primary/15 transition">
          {chats.map(chat => (
            <ChatItem key={chat.id} chat={chat}/>
          ))}
        </Box>
      }

      {(!(!!pinned_chats) && !(!!chats.length)) && (
        <Empty title={"Chats not found"}/>
      )}
    </div>
  );
};

export default MessagesPage;