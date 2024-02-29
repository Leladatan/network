"use client";

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {getFormatData} from "@/utils/functions/format-data";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LucideIcon, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {Dispatch, SetStateAction, useMemo} from "react";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {useOrigin} from "@/hooks/use-origin";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

type props = {
  post: PostWithUser;
  handlerActions: (userId: string, postId: string, type: "edit" | "delete", title?: string) => Promise<void>;
  isLoading: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const PostHeader = ({post, handlerActions, setIsEdit, isLoading}: props) => {
  const origin: string = useOrigin();
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };

  const userId: string = usePathname()!.slice(9);
  const isOwner: boolean = currentUser.id === userId;

  const ContextMenuItems: {
    label: string,
    icon: LucideIcon,
    type: "edit" | "delete",
    handler: (userId: string, postId: string, type: "edit" | "delete", title?: string) => void
  }[] = useMemo(() => [
    {
      label: "Edit",
      icon: Pencil,
      type: "edit",
      handler: (userId: string, postId: string, type: "edit" | "delete", title) =>
        handlerActions(userId, postId, type, title)
    },
    {
      label: "Delete",
      icon: Trash2,
      type: "delete",
      handler: (userId: string, postId: string, type: "edit" | "delete") =>
        handlerActions(userId, postId, type)
    },
  ], [post]);


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
          <h4 className="break-all"><Link href={`${origin}/profile/${post.author.id}`}>{post.author.username}</Link>
          </h4>
        </div>
        <span className="text-neutral-400">{getFormatData(new Date(post.createdAt))}</span>
      </div>
      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="self-start">
              <MoreHorizontal/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {ContextMenuItems.map(item =>
              <DropdownMenuItem
                disabled={isLoading}
                onClick={() => item.label === "Edit" ? setIsEdit(true) : item.handler(post.userId, post.id, item.type)}
                key={item.label}
                className={cn("flex items-center gap-x-3 cursor-pointer", item.label === "Delete" && "text-rose-500")}
              >
                <item.icon size={15}/>
                <p>{item.label}</p>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default PostHeader;