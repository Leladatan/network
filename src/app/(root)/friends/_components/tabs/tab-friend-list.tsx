"use client";

import {FriendAndUser} from "@/app/(root)/friends/page";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import Link from "next/link";
import {useOrigin} from "@/hooks/use-origin";
import {MoreHorizontal, Trash} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {FriendDelete} from "@/actions/friend/friend-delete";
import {useSession} from "next-auth/react";
import Box from "@/components/ui/box";
import Empty from "@/components/empty";

const TabFriendList = ({friends}: { friends: FriendAndUser[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const origin: string = useOrigin();
  const router = useRouter();
  const handleDeleteFriend = async (userId: string) => {
    try {
      setIsLoading(true);
      await FriendDelete(currentUser.id, userId);
      toast({
        title: "The subscribe was successfully deleted."
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
      {!!friends.length ?
        friends.map(friend => (
          <Box key={friend.id}>
            <div className="relative flex gap-x-4">
              <Link className="relative" href={`${origin}/profile/${friend.friend.id}`}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={friend.friend.avatar}/>
                  <AvatarFallback><SkewLoader size={15}/></AvatarFallback>
                </Avatar>
                {friend.friend.online &&
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full"/>}
              </Link>
              <p className="pt-3 backdrop-blur">{friend.friend.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={isLoading} asChild>
                  <MoreHorizontal size={20} className="absolute right-0 top-0 cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    disabled={isLoading}
                    className="flex items-center gap-x-3 text-rose-500 cursor-pointer"
                    onClick={() => handleDeleteFriend(friend.friend.id)}
                  >
                    <Trash size={20}/>
                    <p>Delete</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Box>
        ))
        :
        <Empty title={"Not found your friends"}/>
      }
    </div>
  );
};

export default TabFriendList;