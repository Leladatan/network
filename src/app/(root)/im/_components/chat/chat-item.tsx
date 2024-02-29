"use client";

import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {useSession} from "next-auth/react";
import Link from "next/link";

const ChatItem = ({chat}: { chat: ChatWithUserAndReceiver }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const isUserSend: boolean = !!chat.messages.length && chat.messages[0].authorId === currentUser.id;

  return (
    <Link href={`/im/${chat.receiverId}`} className="flex items-center justify-between gap-x-6">
      <div className="flex items-center gap-x-3 self-start">
        <div className="relative w-[65px] h-[65px]">
          <Avatar className="w-full h-full">
            <AvatarImage src={chat.receiver.avatar}/>
            <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
          </Avatar>
          {chat.receiver.online && <div className="absolute  bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-500"/>}
        </div>
        <h3>{chat.receiver.username}</h3>
      </div>
      <div className="flex items-center gap-x-3 self-center">
        {chat.messages.map(message => {
          if (isUserSend) {
            return (
              <div key={message.id} className="flex items-center gap-x-4">
                <Avatar className="w-[45px] h-[45px]">
                  <AvatarImage src={chat.user.avatar}/>
                  <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
                </Avatar>
                <p className="truncate">{message.message}</p>
              </div>
            );
          }

          return (
            <div key={message.id} className="flex items-center gap-x-4">
              <Avatar className="w-[45px] h-[45px]">
                <AvatarImage src={chat.receiver.avatar}/>
                <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
              </Avatar>
              <p className="truncate">{message.message}</p>
            </div>
          );
        })}
      </div>
      <div></div>
    </Link>
  );
};

export default ChatItem;