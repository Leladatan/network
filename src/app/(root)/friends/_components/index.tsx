"use client";

import {FriendAndUser, SubscriberAndSubscriber, SubscriberAndUser} from "@/app/(root)/friends/page";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TabFriendList from "@/app/(root)/friends/_components/tabs/tab-friend-list";
import TabSubscriberList from "@/app/(root)/friends/_components/tabs/tab-subscriber-list";
import TabSubscriptionList from "@/app/(root)/friends/_components/tabs/tab-subscription-list";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";

type props = {
  subscribers: SubscriberAndUser[];
  subscriptions: SubscriberAndSubscriber[];
  friends: FriendAndUser[];
};

const FriendPage = ({subscribers, subscriptions, friends}: props) => {
  return (
      <Tabs defaultValue={"friends"} className="flex flex-col gap-y-5">
        <Box>
          <TabsList>
            <TabsTrigger value={"friends"}>Friends ({friends.length})</TabsTrigger>
            <TabsTrigger value={"subscribers"}>Subscribers ({subscribers.length})</TabsTrigger>
            <TabsTrigger value={"subscriptions"}>Subscriptions ({subscriptions.length})</TabsTrigger>
          </TabsList>
        </Box>
        <Box>
          <InputSearch name={"search"} placeholder={"Search your friend..."} />
        </Box>
          <TabsContent value={"friends"}>
            <TabFriendList friends={friends} />
          </TabsContent>
          <TabsContent value={"subscribers"}>
            <TabSubscriberList subscribers={subscribers} />
          </TabsContent>
          <TabsContent value={"subscriptions"}>
            <TabSubscriptionList subscriptions={subscriptions} />
          </TabsContent>
      </Tabs>
  );
};

export default FriendPage;