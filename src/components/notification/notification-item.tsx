"use client";

import Link from "next/link";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Notification, TypeNotification} from "@prisma/client";
import {LucideIcon, MessageSquareQuote, ThumbsUp, UserPlus} from "lucide-react";
import {useMemo} from "react";
import {useOrigin} from "@/hooks/use-origin";
import {useInView} from "react-intersection-observer";
import {notificationCheck} from "@/actions/notification/notification-check";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const NotificationItem = ({notification}: {notification: Notification}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const router = useRouter();
  const origin: string = useOrigin();
  const { ref, inView } = useInView({
    threshold: 0,
  });

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

  const notificationItem: { type: TypeNotification, message: string, icon: LucideIcon } =
    notificationMessages.find(item => item.type === notification.type) as { type: TypeNotification, message: string, icon: LucideIcon };

  if (inView && !notification.checked) {
    notification.checked = true;
    (async () => {
      await notificationCheck(currentUser.id, notification.id);
      router.refresh();
    })();

  }

  return (
    <DropdownMenuItem ref={ref} className="flex items-center justify-center" key={notification.id}>
      <Link href={`${origin}/profile/${notification.subject_userId}`}
            className="flex items-center justify-between gap-x-2">
        <div className="relative">
          <notificationItem.icon size={20}/>
          {!notification.checked &&
            <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-rose-500"/>}
        </div>
        <h4>
          {notificationItem.message}
        </h4>
      </Link>
    </DropdownMenuItem>
  );
};

export default NotificationItem;