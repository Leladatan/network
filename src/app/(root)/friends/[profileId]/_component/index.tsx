"use client";

import {FriendAndUser, SubscriberAndSubscriber, SubscriberAndUser} from "@/app/(root)/friends/page";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import TabSubscriptionUserList from "@/app/(root)/friends/[profileId]/_component/tabs/tab-subscription-user-list";
import TabSubscriberUserList from "@/app/(root)/friends/[profileId]/_component/tabs/tab-subscriber-user-list";
import TabFriendUserList from "@/app/(root)/friends/[profileId]/_component/tabs/tab-friend-user-list";

type props = {
  subscribers: SubscriberAndUser[];
  subscriptions: SubscriberAndSubscriber[];
  friends: FriendAndUser[];
};

const FriendUserPage = ({subscribers, subscriptions, friends}: props) => {
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
            <TabFriendUserList friends={friends} />
          </TabsContent>
          <TabsContent value={"subscribers"}>
            <TabSubscriberUserList subscribers={subscribers} />
          </TabsContent>
          <TabsContent value={"subscriptions"}>
            <TabSubscriptionUserList subscriptions={subscriptions} />
          </TabsContent>
      </Tabs>
  );
};

export default FriendUserPage;