import {Metadata} from "next";
import {db} from "@/lib/db";
import {Friend, Photo, Subscriber, User} from "@prisma/client";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ProfileIdPage from "@/app/(root)/profile/[profileId]/_components";
import {exclude} from "@/lib/exclude";

type Props = {
  params: {
    profileId: string;
  }
};

export async function generateMetadata({params: {profileId}}: Props): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user: Omit<User, "password"> | null = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    redirect(`/profile/${session.user.id}`);
  }

  return {
    title: `${user.username}`,
    description: `${user.username} | Profile`,
  };
}

export type UserWithSubscribers = Omit<User, "password"> & {
  subscribers: SubscribersWithUser[];
  subscriptions: SubscriptionsWithUser[];
  friends: FriendWithUser[];
  photos: Photo[];
};

type SubscribersWithUser = Subscriber & {
  user: Omit<User, "password">;
};

type SubscriptionsWithUser = Subscriber & {
  subscriber: Omit<User, "password">;
};

type FriendWithUser = Friend & {
  friend: Omit<User, "password">;
};

const Page = async ({params}: {params: {profileId: string}}) => {
  const session = await getServerSession(authOptions);
  const user: Omit<User, "password"> | null = await db.user.findUnique({
    where: {
      id: params.profileId,
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    redirect(`/profile/${session.user.id}`);
  }

  const subscribers: SubscribersWithUser[] = await db.subscriber.findMany({
    where: {
      subscriberId: user.id
    },
    include: {
      user: {
        select: exclude("user", ["password"]),
      }
    }
  });
  
  const subscriptions: SubscriptionsWithUser[] = await db.subscriber.findMany({
    where: {
      userId: user.id,
    },
    include: {
      subscriber: {
        select: exclude("user", ["password"]),
      }
    }
  });

  const friends: FriendWithUser[] = await db.friend.findMany({
    where: {
      userId: user.id,
    },
    include: {
      friend: {
        select: exclude("user", ["password"]),
      }
    }
  });

  const photos: Photo[] = await db.photo.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  const profile: UserWithSubscribers = {...user, subscribers, subscriptions, friends, photos};

  return (
    <ProfileIdPage {...profile} />
  );
};

export default Page;