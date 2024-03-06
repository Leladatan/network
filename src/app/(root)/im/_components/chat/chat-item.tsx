"use client";

import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {useMemo} from "react";
import {LucideIcon, Pin, Trash2} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {chatPin} from "@/actions/chat/chat-pin";
import {ChatDelete} from "@/actions/chat/chat-delete";
import {cn} from "@/lib/utils";
import Box from "@/components/ui/box";

const ChatItem = ({chat}: { chat: ChatWithUserAndReceiver }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const isUser: boolean = chat.userId !== currentUser.id;
  const isUserSend = chat.messages[0].authorId === chat.userId;
  const router = useRouter();

  const handlePin = async (): Promise<void> => {
    try {
      await chatPin({userId: currentUser.id, chatId: chat.id, value: !chat.isPinned});

      if (chat.isPinned) {
        toast({
          title: "Chat successful pinned"
        });
      }

      if (!chat.isPinned) {
        toast({
          title: "Chat successful unpinned"
        });
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await ChatDelete(currentUser.id, chat.id);

      toast({
        title: "Chat successful deleted"
      });

      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    }
  };

  const actions: { label: string, action: () => void, color: string, icon: LucideIcon }[] = useMemo(() => [
    {
      label: chat.isPinned ? "Unpin" : "Pin",
      action: () => handlePin(),
      color: "",
      icon: Pin
    },
    {
      label: "Delete",
      action: () => handleDelete(),
      color: "text-rose-500",
      icon: Trash2
    }
  ], [chat.isPinned]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link href={`/im/${chat.id}`} className="flex items-center justify-between gap-x-6">
          <div className="flex items-center gap-x-3 self-start">
            <div className="relative w-[65px] h-[65px]">
              <Avatar className="w-full h-full">
                <AvatarImage src={isUser ? chat.user.avatar : chat.receiver.avatar}/>
                <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
              </Avatar>
              {isUser ? chat.user.online : chat.receiver.online &&
                <div className="absolute  bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-500"/>}
            </div>
            <h3>{isUser ? chat.user.username : chat.receiver.username}</h3>
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
          <div>
            {chat.isPinned && (
              <Box className="rounded-full p-3">
                <Pin size={20} className="rotate-45 text-primary-foreground/80"/>
              </Box>
            )}
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {actions.map(item => (
          <ContextMenuItem key={item.label} className={cn("flex items-center gap-x-2", item.color)}
                           onClick={item.action}>
            <item.icon size={20}/>
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatItem;