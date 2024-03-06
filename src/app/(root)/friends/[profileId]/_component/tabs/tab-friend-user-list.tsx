"use client";

import {FriendAndUser} from "@/app/(root)/friends/page";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import Link from "next/link";
import {useOrigin} from "@/hooks/use-origin";
import Box from "@/components/ui/box";
import Empty from "@/components/empty";

const TabFriendUserList = ({friends}: { friends: FriendAndUser[] }) => {
  const origin: string = useOrigin();

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
            </div>
          </Box>
        ))
        :
        <Empty title={"Not found friend"} />
      }
    </div>
  );
};

export default TabFriendUserList;