"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Bell} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Notification} from "@prisma/client";
import NotificationItem from "@/components/notification/notification-item";
import {ScrollArea} from "@/components/ui/scroll-area";

const NotificationHeader = ({notifications, count}: { notifications: Notification[], count: number }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Bell className="cursor-pointer"/>
            {!!count && (
              <>
                <div className="absolute bg-rose-500 w-3 h-3 -top-1 -right-1 rounded-full cursor-pointer"/>
                <div className="absolute bg-rose-500 w-3 h-3 -top-1 -right-1 rounded-full animate-ping cursor-pointer"/>
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center justify-center py-2 px-4">
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <Separator className="bg-accent-foreground w-1/2 my-2"/>
          <ScrollArea className="flex flex-col items-center justify-center gap-y-3 h-52 w-44">
            {!!notifications.length ?
              notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification}/>
              ))
              :
              <DropdownMenuItem>
                <h4>Empty notifications</h4>
              </DropdownMenuItem>
            }
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationHeader;