"use client";

import {useOrigin} from "@/hooks/use-origin";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {getFormatData} from "@/utils/functions/format-data";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";

type props = {
  post: PostWithUser;
};

const FeedPostHeader = ({post}: props) => {
  const origin: string = useOrigin();

  return (
    <div className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Link className="relative" href={`${origin}/profile/${post.author.id}`}>
            <Avatar>
              <AvatarImage src={post.author.avatar}/>
              <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
            </Avatar>
            {post.author.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
          </Link>
          <h4 className="break-all"><Link href={`${origin}/profile/${post.author.id}`}>{post.author.username}</Link></h4>
        </div>
        <span className="text-neutral-400">{getFormatData(new Date(post.createdAt))}</span>
      </div>
    </div>
  );
};

export default FeedPostHeader;