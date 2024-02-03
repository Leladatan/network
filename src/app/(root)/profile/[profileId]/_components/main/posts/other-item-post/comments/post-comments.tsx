"use client";

import {Separator} from "@/components/ui/separator";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import PostCommentItem
  from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/comments/post-comment-item";
import {Dispatch, SetStateAction} from "react";
import {X} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const PostComments = ({post, setIsViewComment}: {
  post: PostWithUser,
  setIsViewComment: Dispatch<SetStateAction<boolean>>
}) => {

  return (
    <>
      <Separator className="bg-accent-foreground mt-4 mb-1"/>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="self-end">
            <X size={20} className="cursor-pointer" onClick={() => setIsViewComment(false)}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close the Comments window</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex flex-col gap-y-4">
        {!!post.comments.length ?
          post.comments.map(comment => (
            <PostCommentItem key={comment.id} comment={comment}/>
          ))
          :
          <h4 className="text-center mb-2">Comments is empty</h4>
        }
      </div>
    </>
  );
};

export default PostComments;