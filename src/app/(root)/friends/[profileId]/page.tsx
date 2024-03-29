import {db} from "@/lib/db";
import {Friend, Subscriber, User} from "@prisma/client";
import {getServerSession} from "next-auth";
import {exclude} from "@/lib/exclude";
import FriendUserPage from "@/app/(root)/friends/[profileId]/_component";
import {authOptions} from "@/utils/constants/auth";

export type SubscriberAndUser = Subscriber & {
  user: Omit<User, "password">;
};

export type SubscriberAndSubscriber = Subscriber & {
  subscriber: Omit<User, "password">;
};

export type FriendAndUser = Friend & {
  friend: Omit<User, "password">;
}

const Page = async ({searchParams}: {searchParams: {search: string}}) => {
  const session = await getServerSession(authOptions);

  let subscribers: SubscriberAndUser[] = await db.subscriber.findMany({
    where: {
      subscriberId: session.user.id,
    },
    include: {
      user: {
        select: exclude("user", ["password"]),
      }
    }
  });

  let subscriptions: SubscriberAndSubscriber[] = await db.subscriber.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subscriber: {
        select: exclude("user", ["password"]),
      }
    }
  });

  let friends: FriendAndUser[] = await db.friend.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      friend: {
        select: exclude("user", ["password"]),
      }
    }
  });

  if (searchParams.search) {
    friends = friends.filter(item => item.friend.username === searchParams.search || item.friend.id === searchParams.search);
    subscriptions = subscriptions.filter(item => item.subscriber.username === searchParams.search || item.subscriber.id === searchParams.search);
    subscribers = subscribers.filter(item => item.user.username === searchParams.search || item.user.id === searchParams.search);
  }

  return (
    <FriendUserPage subscribers={subscribers} subscriptions={subscriptions} friends={friends} />
  );
};

export default Page;