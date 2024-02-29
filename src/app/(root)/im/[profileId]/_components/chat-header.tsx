"use client";

import Box from "@/components/ui/box";
import {User} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Search, Trash2, XIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {toast} from "@/components/ui/use-toast";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {ChatDelete} from "@/actions/chat/chat-delete";
import InputSearch from "@/components/ui/input-search";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const ChatHeader = ({receiver, userId, chatId}: {
  receiver: Omit<User, "password">,
  userId: string,
  chatId: string
}) => {
  const searchParams = useSearchParams();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const toggleSearch = (): void => {
    setIsSearch(prev => !prev);
  };

  const handlerDelete = async () => {
    try {
      setIsLoading(true);

      await ChatDelete(userId, chatId);

      router.push("/im");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    } finally {
      setIsLoading(true);
    }
  };

  useEffect((): void => {
    if (searchParams && searchParams.get("search")) {
      setIsSearch(true);
    }
  }, [searchParams]);

  return (
    <>
      <Box className="sticky top-28 flex items-center justify-between gap-x-4 z-40 bg-primary/40">
        <Link href={`/profile/${receiver.id}`} className="flex items-center gap-x-3 self-start">
          <div className="relative w-[50px] h-[50px]">
            <Avatar className="w-full h-full">
              <AvatarImage src={receiver.avatar}/>
              <AvatarFallback><SkewLoader color={"purple"} size={10}/></AvatarFallback>
            </Avatar>
            {receiver.online && <div className="absolute  bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-500"/>}
          </div>
          <h3>{receiver.username}</h3>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isLoading}>
            <Button variant={"ghost"} size={"sm"}>
              <MoreHorizontal size={20}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-x-3" onClick={toggleSearch}>
              <Search size={20}/> Search
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500" onClick={handlerDelete}>
              <Trash2 size={20}/> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
      {isSearch && (
        <Box className="sticky top-56 z-40 bg-primary/40 flex items-center gap-x-4">
          <InputSearch name={"search"} placeholder={"Search message..."}/>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <XIcon size={20} className="text-rose-500" onClick={toggleSearch}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Close
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </Box>
      )}
    </>
  );
};

export default ChatHeader;