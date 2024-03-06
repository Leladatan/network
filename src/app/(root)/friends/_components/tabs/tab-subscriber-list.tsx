"use client";

import {SubscriberAndUser} from "@/app/(root)/friends/page";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";
import {FriendAdd} from "@/actions/friend/friend-add";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, UserRoundPlus} from "lucide-react";
import Box from "@/components/ui/box";
import Empty from "@/components/empty";

const TabSubscriberList = ({subscribers}: { subscribers: SubscriberAndUser[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handlerFriendAdd = async (friendId: string) => {
    try {
      setIsLoading(true);
      await FriendAdd(currentUser.id, friendId);
      toast({
        title: "The application has been successfully submitted."
      });
      router.refresh();
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
    <div className="grid grid-cols-5 gap-5">
      {!!subscribers.length ?
        subscribers.map(subscriber => (
          <Box key={subscriber.id}>
            <div className="relative flex items-center gap-x-4">
              <Link className="relative" href={`${origin}/profile/${subscriber.user.id}`}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={subscriber.user.avatar}/>
                  <AvatarFallback><SkewLoader size={15}/></AvatarFallback>
                </Avatar>
                {subscriber.user.online &&
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full"/>}
              </Link>
              <p className="pt-3 backdrop-blur">{subscriber.user.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={isLoading} asChild>
                  <MoreHorizontal size={20} className="absolute right-0 top-0 cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    disabled={isLoading}
                    className="flex items-center gap-x-3 cursor-pointer"
                    onClick={() => handlerFriendAdd(subscriber.user.id)}
                  >
                    <UserRoundPlus size={20} />
                    <p>Add</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Box>
        ))
        :
        <Empty title={"Not found your subscribers"}/>
      }
    </div>
  );
};

export default TabSubscriberList;