"use client";

import {SubscriberAndUser} from "@/app/(root)/friends/page";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import Box from "@/components/ui/box";
import Empty from "@/components/empty";

const TabSubscriberUserList = ({subscribers}: { subscribers: SubscriberAndUser[] }) => {
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
            </div>
          </Box>
        ))
        :
        <Empty title={"Not found your subscribers"}/>
      }
    </div>
  );
};

export default TabSubscriberUserList;