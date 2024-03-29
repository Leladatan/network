import {Post, User, Comment, Subscriber} from "@prisma/client";
import ProfileHeader from "@/app/(root)/profile/[profileId]/_components/header/profile-header";
import {db} from "@/lib/db";
import ProfileMain from "@/app/(root)/profile/[profileId]/_components/main";
import {exclude} from "@/lib/exclude";
import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import {MusicListGetWithSearch} from "@/actions/music/music-list/music-list-get-with-search";
import {MusicListType} from "@/app/(root)/music/page";

export type PostWithUser = Post & {
  author: Omit<User, "password">;
  comments: CommentWithUser[];
};

export type CommentWithUser = Comment & {
  author: Omit<User, "password">;
};

export type SubscribersOnlineWithUser = Subscriber & { subscriber: Omit<User, "password">};

const ProfileIdPage = async (user: UserWithSubscribers) => {
  const posts: PostWithUser[] = await db.post.findMany({
    where: {
      userId: user.id
    },
    include: {
      author: {
        select: exclude("user", ["password"]),
      },
      comments: {
        include: {
          author: {
            select: exclude("user", ["password"]),
          }
        }
      },
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const subscribers: SubscribersOnlineWithUser[] = await db.subscriber.findMany({
    where: {
      userId: user.id,
    },
    include: {
      subscriber: true,
    }
  });

  const subscribers_online: SubscribersOnlineWithUser[] = subscribers.filter(item => item.subscriber.online);

  const musics: MusicListType[] = await MusicListGetWithSearch(user.id);

  return (
    <div className="flex flex-col">
      <ProfileHeader user={user}/>
      <ProfileMain user={user} posts={posts} subscribers_online={subscribers_online} musics={musics} />
    </div>
  );
};

export default ProfileIdPage;