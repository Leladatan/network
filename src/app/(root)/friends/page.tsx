import {db} from "@/lib/db";
import {Subscriber, User} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import FriendPage from "@/app/(root)/friends/_components";
import {exclude} from "@/lib/exclude";

export type SubscriberAndUser = Subscriber & {
  subscriber: Omit<User, "password">;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const subscribers: SubscriberAndUser[] = await db.subscriber.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subscriber: {
        select: exclude("user", ["password"]),
      }
    }
  });

  return (
    <FriendPage subscribers={subscribers} />
  );
};

export default Page;