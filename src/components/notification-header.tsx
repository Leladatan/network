"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Bell, LucideIcon, MessageSquareQuote, ThumbsUp, UserPlus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useOrigin} from "@/hooks/use-origin";
import {Notification, TypeNotification} from "@prisma/client";
import {useMemo} from "react";

const NotificationHeader = ({notifications}: { notifications: Notification[] }) => {
  const origin: string = useOrigin();

  const notificationMessages: { type: TypeNotification, message: string, icon: LucideIcon }[] = useMemo(() => [
    {
      message: "New subscriber",
      icon: UserPlus,
      type: "friend_add",
    },
    {
      message: "New like",
      icon: ThumbsUp,
      type: "like_add"
    },
    {
      message: "New comment",
      icon: MessageSquareQuote,
      type: "comment_add",
    }
  ], []);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Bell className="cursor-pointer"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center justify-center py-2 px-4">
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <Separator className="bg-accent-foreground w-1/2 my-2"/>
          {!!notifications.length ?
            notifications.map(notification => {
              const notificationItem = notificationMessages.find(item => item.type === notification.type);

              if (notificationItem) {
                return (
                  <DropdownMenuItem key={notification.id}>
                    <Link href={`${origin}/profile/${notification.subject_userId}`}
                          className="flex items-center gap-x-2">
                      <notificationItem.icon size={20}/>
                      <h4>
                        {notificationItem.message}
                      </h4>
                    </Link>
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem key={notification.id}>
                  <h4>Not found notification</h4>
                </DropdownMenuItem>
              );
            })
            :
            <DropdownMenuItem>
              <h4 className="text-primary">
                Empty notifications
              </h4>
            </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="absolute bg-rose-500 w-3 h-3 -top-1 -right-1 rounded-full"/>
    </div>
  );
};

export default NotificationHeader;