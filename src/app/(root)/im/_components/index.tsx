"use client";

import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import {useSocket} from "@/providers/socket/socket-provider";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import ChatItem from "@/app/(root)/im/_components/chat/chat-item";

const MessagesPage = ({chats}: {chats: ChatWithUserAndReceiver[]}) => {
  const {isConnected} = useSocket();

  return (
    <div className="flex flex-col gap-y-2">
      <Box>
        <InputSearch name={"search"} placeholder={"Search..."}/>
      </Box>

      <Box>
        {isConnected ? <p className="text-emerald-500">Connect</p> : <p className="text-rose-500">Disconnect</p>}
      </Box>

      <Box className="hover:bg-primary/15 transition">
        {!!chats.length ?
          chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))
        :
          <h3>Chats not found</h3>
        }
      </Box>
    </div>
  );
};

export default MessagesPage;