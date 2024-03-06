"use client";

import ChatHeader from "@/app/(root)/im/[profileId]/_components/chat-header";
import ChatFooter from "@/app/(root)/im/[profileId]/_components/chat-footer";
import ChatMessage from "@/app/(root)/im/[profileId]/_components/chat-message";
import Empty from "@/components/empty";
import {Message, User} from "@prisma/client";
import {useChatQuery} from "@/hooks/use-chat-query";
import {useChatSocket} from "@/hooks/use-chat-socket";
import React, {useEffect, useState} from "react";
import PendingLoader from "@/components/pending-loader";
import {useInView} from "react-intersection-observer";
import lodash from "lodash";
import {useSession} from "next-auth/react";

type ChatMessagesProps = {
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "chatId";
  paramValue: string;
  user: Omit<User, "password">,
  receiver: Omit<User, "password">
};

const Chat = ({
                chatId,
                apiUrl,
                user,
                receiver,
                paramKey,
                paramValue
              }: ChatMessagesProps) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [page, setPage] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const queryKey: string = `chat:${chatId}`;
  const addKey: string = `chat:${chatId}:messages`;
  const updateKey: string = `chat:${chatId}:messages:update`;

  const isReceiver: boolean = currentUser.id === user.id;

  const {ref, inView} = useInView();

  const {
    data,
    status
  } = useChatQuery({
    queryKey, apiUrl, paramKey, paramValue, page
  });

  const getStatus = () => {
    if (status === "pending") {
      return <PendingLoader/>;
    }

    return <Empty classname_box={"pb-28"} title={"Messages not found"}/>;
  };

  useChatSocket({queryKey, addKey, updateKey});

  useEffect((): void => {
    setTimeout((): void => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  }, []);

  useEffect((): void => {
    if (!!data?.pages[0].items.length) {
      const content = data?.pages[0].items;
      const messages_content: Message[] = lodash.uniq([...messages, ...content]);
      setMessages(messages_content);
    }
  }, [page]);

  useEffect(() => {
    if (!!data?.pages[0].items.length) {
      setMessages(data?.pages[0].items);
    }
  }, [data]);

  // useEffect((): void => {
  //   if (data && !!data.pages[0].items.length) {
  //     if (inView) {
  //       setPage(prev => prev + 1);
  //     }
  //   }
  //
  // }, [inView]);

  return (
    <div className="relative flex flex-col gap-y-4 w-full">
      <ChatHeader receiver={isReceiver ? receiver : user} userId={isReceiver ? user.id : receiver.id} chatId={chatId}/>
      {!!messages.length ?
        <div className="flex flex-col-reverse items-center justify-end gap-y-3 h-full pb-28">
          {messages.map((message: Message) => (
            <ChatMessage key={message.id} message={message} user={user} receiver={receiver}/>
          ))}
          <div ref={ref}/>
        </div>
        :
        getStatus()
      }
      <ChatFooter userId={isReceiver ? user.id : receiver.id} receiverId={isReceiver ? receiver.id : user.id} apiUrl={"/api/socket/messages"}
                  query={{chatId: chatId}}/>
    </div>
  );
};

export default Chat;