"use client";

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {getFormatData} from "@/utils/functions/format-data";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LucideIcon, MoreHorizontal, Pencil, Trash} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {Button} from "@/components/ui/button";
import {useMemo, useState} from "react";
import {CommentWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {useParams, usePathname, useRouter} from "next/navigation";
import {PostCommentDelete} from "@/actions/profile/post/comment/post-comment-delete";
import {toast} from "@/components/ui/use-toast";
import {PostCommentEdit} from "@/actions/profile/post/comment/post-comment-edit";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";

const PostCommentItem = ({comment}: {comment: CommentWithUser}) => {
  const [value, setValue] = useState<string>(comment.title);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();

  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const isOwnerComment: boolean = currentUser.id === comment.authorId;
  const isOwner: boolean = currentUser.id === params.profileId;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const router = useRouter();

  const actions: {
    label: string,
    icon: LucideIcon,
    handler: (postId: string, commentId: string, title?: string) => void
  }[] = useMemo(() => [
    {
      label: "Edit",
      icon: Pencil,
      handler: () => setIsEdit(true)
    },
    {
      label: "Delete",
      icon: Trash,
      handler: (postId: string, commentId: string) => handleDeleteComment(postId, commentId)
    }
  ], []);

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      setIsLoading(true);

      await PostCommentDelete(postId, commentId);

      toast({
        title: "Comment success deleted"
      });

      router.refresh();
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComment = async (postId: string, commentId: string, title: string) => {
    try {
      setIsLoading(true);

      await PostCommentEdit(postId, commentId, title);

      toast({
        title: "Comment success updated"
      });

      setIsEdit(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-4">
          <Link className="relative" href={`${origin}/profile/${comment.author.id}`}>
            <Avatar>
              <AvatarImage src={comment.author.avatar}/>
              <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
            </Avatar>
            {comment.author.online &&
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
          </Link>
          <h4><Link href={`${origin}/profile/${comment.author.id}`}>{comment.author.username}</Link></h4>
          <span className="text-neutral-400">{getFormatData(new Date(comment.createdAt))}</span>
        </div>
        {isOwnerComment &&
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal size={20}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {actions.map(action => (
                    <DropdownMenuItem
                      key={action.label}
                      onClick={() => action.handler(comment.postId, comment.id)}
                      className={cn("flex items-center gap-x-2", action.label === "Delete" && "text-rose-500")}
                      disabled={isLoading}
                    >
                      <action.icon size={15}/>
                      <p>
                        {action.label}
                      </p>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>
        }
        {(isOwner && !isOwnerComment) &&
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal size={20}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {actions.filter(item => item.label !== "Edit").map(action => (
                <DropdownMenuItem
                  key={action.label}
                  onClick={() => action.handler(comment.postId, comment.id)}
                  className="flex items-center gap-x-2 text-rose-500"
                  disabled={isLoading}
                >
                  <action.icon size={15}/>
                  <p>
                    {action.label}
                  </p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
      <div className="my-2">
        {isEdit ?
          <div className="flex flex-col gap-y-3 self-end">
            <Textarea
              disabled={isLoading}
              className="max-h-[200px] transition"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the text of the comment"
              maxLength={maxLengthForPostTitle}
            />
            <div className="self-end flex gap-x-4">
              <Button
                disabled={isLoading}
                onClick={() => setIsEdit(false)}
                className="self-end"
                size={"sm"}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => handleEditComment(comment.postId, comment.id, value)}
                size={"sm"}
              >
                Save
              </Button>
            </div>
          </div>
          :
          <p className="break-all">{comment.title}</p>
        }
      </div>
    </>
  );
};

export default PostCommentItem;