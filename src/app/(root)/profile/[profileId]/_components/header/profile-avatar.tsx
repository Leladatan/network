"use client";

import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LucideIcon} from "lucide-react";
import {SkewLoader} from "react-spinners";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import {User} from "@prisma/client";

const ProfileAvatar = ({user, actions, type = "default"}: {
  user: UserWithSubscribers | Omit<User, "password">,
  actions?: {
    label: string,
    icon: LucideIcon,
    isActive: boolean,
    handler: () => void,
    color: string
  }[],
  type: "edit" | "default"
}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };

  const isOwner: boolean = currentUser.id === user.id;

  if (!isOwner) {
    return (
      <div className="relative">
        <Avatar className="w-48 h-48">
          <AvatarImage src={user.avatar || "/avatar.jpg"}/>
          <AvatarFallback><SkewLoader color="#36d7b7"/></AvatarFallback>
        </Avatar>
        {(user.online && type !== "edit") &&
            <>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full"/>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full animate-ping"/>
            </>
        }
      </div>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="relative">
      <Avatar className="w-48 h-48">
          <AvatarImage src={user.avatar || "/avatar.jpg"}/>
          <AvatarFallback><SkewLoader color="#36d7b7"/></AvatarFallback>
        </Avatar>
        {(user.online && type !== "edit") &&
            <>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full"/>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full animate-ping"/>
            </>
        }
      </ContextMenuTrigger>
      <ContextMenuContent>
        {actions && actions.map(item => (
          <ContextMenuItem
            key={item.label}
            disabled={!item.isActive}
            onClick={item.handler}
            className={cn("flex items-center gap-x-2", item.color)}
          >
            <item.icon size={15}/>
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ProfileAvatar;