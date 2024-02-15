"use client";

import {ChangeLike} from "@/actions/like/change-like";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Eye, Heart, LucideIcon, MessageCircleMore, MessageCirclePlus} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {useRouter} from "next/navigation";
import {IsLikeLikedPost} from "@/actions/like/is-like";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import TextareaForPostComment
  from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/textarea-for-post-comment";
import PostComments
  from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/comments/post-comments";

const FeedPostFooter = ({post, postId, authorId}: { post: PostWithUser, postId: string, authorId: string }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const router = useRouter();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [isViewComment, setIsViewComment] = useState<boolean>(false);

  const CommentActions: {
    label: string,
    icon: LucideIcon,
    disabled: boolean,
    handler: () => void,
  }[] = useMemo(() => [
    {
      label: "View",
      icon: Eye,
      disabled: !(!!post.comments.length),
      handler: () => handleViewComments()
    },
    {
      label: "Comment",
      icon: MessageCirclePlus,
      disabled: false,
      handler: () => handleComment()
    },
  ], [post]);

  const handleLike = async () => {
    try {
      if (isLike) {
        await ChangeLike(postId, {action: "dislike", userId: currentUser.id, authorId: authorId});
        toast({
          title: "The dislike was successfully generated"
        });
      }

      if (!isLike) {
        await ChangeLike(postId, {action: "like", userId: currentUser.id, authorId: authorId});
        toast({
          title: "The like was successfully generated"
        });
      }

      setIsLike(prev => !prev);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    }
  };

  const handleComment = (): void => {
    setIsComment(prev => !prev);
  };

  const handleViewComments = (): void => {
    setIsViewComment(prev => !prev);
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        await IsLikeLikedPost(currentUser.id, post.id).then(res => setIsLike(res));
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "An error occurred while receiving likes"
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex items-center gap-x-4">
        <Button disabled={isLoading} variant={"ghost"} className="flex items-center gap-x-2" onClick={handleLike}>
          <Heart size={20} className={isLike ? "fill-rose-500 text-rose-500" : ""}/> {post.likes}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} disabled={isLoading} className="flex gap-x-2">
              <MessageCircleMore size={20} />
              {post.comments.length}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {CommentActions.map(action => (
              <DropdownMenuItem
                key={action.label}
                disabled={action.disabled}
                className="flex items-center gap-4"
                onClick={action.handler}
              >
                <action.icon size={20} />
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isViewComment &&
        <PostComments post={post} setIsViewComment={setIsViewComment} />
      }
      {isComment &&
        <TextareaForPostComment
          setIsComment={setIsComment}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          postId={postId}
          currentUser={currentUser.id}
          authorId={authorId}
        />
      }
    </>
  );
};

export default FeedPostFooter;