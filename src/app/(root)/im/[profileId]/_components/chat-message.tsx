"use client";


import {Message, User} from "@prisma/client";
import Box from "@/components/ui/box";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useModal} from "@/hooks/use-modal";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {Pencil, Trash2} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";
import {MessageDelete} from "@/actions/message/message-delete";

const ChatMessage = ({message, user, receiver}: {
  message: Message,
  user: Omit<User, "password">,
  receiver: Omit<User, "password">
}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isUserSend: boolean = message.authorId === currentUser.id;
  const router = useRouter();
  const {onOpen, onClose} = useModal();

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await MessageDelete(user.id, message.id);

      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild disabled={isLoading}>
        <div
          className={cn("group flex items-center w-full hover:bg-background rounded-xl transition", isUserSend ? "justify-end" : "justify-start")}>
          <Box
            className={cn("flex items-center gap-x-3 max-w-3xl cursor-pointer", isUserSend ? "flex-row-reverse" : "flex-row")}
          >
            <Avatar className="self-start w-[50px] h-[50px]"
                    onClick={() => router.push(`/profile/${isUserSend ? user.id : receiver.id}`)}>
              <AvatarImage src={isUserSend ? user.avatar : receiver.avatar}/>
              <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
            </Avatar>
            {message.photo ?
              <div className="flex flex-col gap-y-4">
                <h3 className={cn("w-full break-all", isUserSend ? "text-end" : "text-start")}>{message.message}</h3>
                <Image src={message.photo} alt={"Message photo"} width={400} height={400} className="rounded-xl"
                       onClick={() => onOpen("photo-view", {photo: message.photo!})}/>
              </div>
              :
              <h3 className={cn("w-full break-all", isUserSend ? "text-end" : "text-start")}>{message.message}</h3>
            }
          </Box>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="flex flex-col gap-y-2">
        <ContextMenuItem className="flex items-center gap-x-3">
          <Pencil size={20}/>Edit
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-x-3 text-rose-500" onClick={() => onOpen("accept", {}, () => handleDelete())}>
          <Trash2 size={20}/>Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatMessage;