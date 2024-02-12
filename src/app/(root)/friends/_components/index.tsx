"use client";

import {FriendAndUser, SubscriberAndSubscriber, SubscriberAndUser} from "@/app/(root)/friends/page";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TabFriendList from "@/app/(root)/friends/_components/tabs/tab-friend-list";
import TabSubscriberList from "@/app/(root)/friends/_components/tabs/tab-subscriber-list";
import TabSubscriptionList from "@/app/(root)/friends/_components/tabs/tab-subscription-list";
import Box from "@/components/ui/box";

type props = {
  subscribers: SubscriberAndUser[];
  subscriptions: SubscriberAndSubscriber[];
  friends: FriendAndUser[];
};

const FriendPage = ({subscribers, subscriptions, friends}: props) => {
  //todo: сделать поиск по имени пользователя или айди
  return (
    <Box>
      <Tabs defaultValue={"friend"}>
        <TabsList>
          <TabsTrigger value={"friend"}>Friend {friends.length}</TabsTrigger>
          <TabsTrigger value={"subscribers"}>Subscribers {subscribers.length}</TabsTrigger>
          <TabsTrigger value={"subscriptions"}>Subscriptions {subscriptions.length}</TabsTrigger>
        </TabsList>
        <TabsContent value={"friend"}>
          <TabFriendList friends={friends} />
        </TabsContent>
        <TabsContent value={"subscribers"}>
          <TabSubscriberList subscribers={subscribers} />
        </TabsContent>
        <TabsContent value={"subscriptions"}>
          <TabSubscriptionList subscriptions={subscriptions} />
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default FriendPage;