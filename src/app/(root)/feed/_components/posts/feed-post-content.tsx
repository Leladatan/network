"use client";

import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import Image from "next/image";
import {useModal} from "@/hooks/use-modal";

type props = {
  post: PostWithUser;
};

const FeedPostContent = ({post}: props) => {
  const {onOpen} = useModal();

  return (
    <div className="flex flex-col gap-y-4 px-4 pb-4">
      <p className="break-all">{post.title}</p>
      {post.photo && <Image src={post.photo} alt={"Image in post"} width={500} height={500}
                            onClick={() => onOpen("photo-view", {photo: post.photo!})} className="rounded-xl cursor-pointer"/>}
      {post.isEdited && <span className="self-end italic text-primary-foreground/50">(edit)</span>}
    </div>
  );
};

export default FeedPostContent;