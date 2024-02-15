"use client";

import Box from "@/components/ui/box";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import FeedPostHeader from "@/app/(root)/feed/_components/posts/feed-post-header";
import FeedPostContent from "@/app/(root)/feed/_components/posts/feed-post-content";
import FeedPostFooter from "@/app/(root)/feed/_components/posts/feed-post-footer";

const FeedPostItem = ({post}: { post: PostWithUser }) => {
  return (
    <Box className="flex flex-col gap-y-4 rounded-xl p-3">
      <FeedPostHeader post={post}/>
      <FeedPostContent
        post={post}
      />
      <FeedPostFooter post={post} postId={post.id} authorId={post.authorId} />
    </Box>
  );
};

export default FeedPostItem;