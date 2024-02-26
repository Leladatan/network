"use client";

import {SubscriberAndSubscriber} from "@/app/(root)/friends/page";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import Box from "@/components/ui/box";

const TabSubscriptionUserList = ({subscriptions}: { subscriptions: SubscriberAndSubscriber[] }) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {!!subscriptions.length ?
        subscriptions.map(subscription => (
          <Box key={subscription.id}>
            <div className="relative flex gap-x-4">
              <Link className="relative" href={`${origin}/profile/${subscription.subscriber.id}`}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={subscription.subscriber.avatar}/>
                  <AvatarFallback><SkewLoader size={15}/></AvatarFallback>
                </Avatar>
                {subscription.subscriber.online &&
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full"/>}
              </Link>
              <p className="pt-3 backdrop-blur">{subscription.subscriber.username}</p>
            </div>
          </Box>
        ))
        :
        <div>
          <h3>
            Not found subscriptions
          </h3>
        </div>
      }
    </div>
  );
};

export default TabSubscriptionUserList;