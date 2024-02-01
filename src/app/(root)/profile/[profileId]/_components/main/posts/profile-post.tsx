"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Heart,
  LucideIcon,
  MessageCircleMore,
  MessageCirclePlus,
} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {ProfilePostEdit} from "@/actions/profile/post/profile-post-edit";
import {toast} from "@/components/ui/use-toast";
import {ProfilePostDelete} from "@/actions/profile/post/profile-post-delete";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {Button} from "@/components/ui/button";
import {ChangeLike} from "@/actions/like/change-like";
import {IsLikeLikedPost} from "@/actions/like/is-like";
import {useSession} from "next-auth/react";
import PostComments from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/post-comments";
import TextareaForPostComment
  from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/textarea-for-post-comment";
import PostHeader from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/post-header";
import PostContent from "@/app/(root)/profile/[profileId]/_components/main/posts/other-item-post/post-content";

const ProfilePost = ({post}: {
  post: PostWithUser
}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [isViewComment, setIsViewComment] = useState<boolean>(false);

  const [isLike, setIsLike] = useState<boolean>(false);

  const router = useRouter();

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

  const handleComment = (): void => {
    setIsComment(prev => !prev);
  };

  const handleViewComments = (): void => {
    setIsViewComment(prev => !prev);
  };

  const handlerActions = async (userId: string, postId: string, type: "edit" | "delete", title?: string) => {
    try {
      if (type === "edit" && title) {
        setIsLoading(true);

        await ProfilePostEdit(userId, postId, title);

        setIsEdit(false);

        toast({
          title: "The post was successfully updated"
        });
      }

      if (type === "delete") {
        setIsLoading(true);

        await ProfilePostDelete(userId, postId);

        toast({
          title: "The post was successfully deleted"
        });
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      if (isLike) {
        await ChangeLike(post.id, {action: "dislike", userId: currentUser.id});
        toast({
          title: "The dislike was successfully generated"
        });
      }

      if (!isLike) {
        await ChangeLike(post.id, {action: "like", userId: currentUser.id});
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

  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        setIsLoading(true);
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
      <div className="flex flex-col gap-y-4 rounded-xl p-3 border-2">
        <PostHeader post={post} handlerActions={handlerActions} isLoading={isLoading} setIsEdit={setIsEdit}/>
        <PostContent
          post={post}
          setIsEdit={setIsEdit}
          handlerActions={handlerActions}
          isLoading={isLoading}
          isEdit={isEdit}
        />
        <div className="flex items-center gap-x-4">
          <Button disabled={isLoading} variant={"ghost"} className="flex items-center gap-x-2" onClick={handleLike}>
            <Heart size={20} className={isLike ? "text-rose-500" : ""}/> {post.likes}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={isLoading} variant={"ghost"} className="flex items-center gap-x-2"
                      onClick={handleComment}>
                <MessageCircleMore size={20}/> {post.comments.length || "0"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CommentActions.map(action => (
                <DropdownMenuItem
                  key={action.label}
                  disabled={action.disabled}
                  className="flex items-center gap-x-2 cursor-pointer"
                  onClick={action.handler}
                >
                  <action.icon size={15}/>
                  <p>{action.label}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isViewComment &&
          <PostComments post={post}/>
        }
      </div>
      {isComment &&
        <TextareaForPostComment
          setIsComment={setIsComment}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          postId={post.id}
          currentUser={currentUser.id}
        />
      }
    </>
  );
};

export default ProfilePost;