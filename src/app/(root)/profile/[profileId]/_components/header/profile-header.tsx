"use client";

import {Button} from "@/components/ui/button";
import ProfileAvatar from "@/app/(root)/profile/[profileId]/_components/header/profile-avatar";
import {useModal} from "@/hooks/use-modal";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {ProfileAvatarDelete} from "@/actions/profile/avatar/profile-avatar-delete";
import {toast} from "@/components/ui/use-toast";
import {LucideIcon, Pencil, Plus, Trash2} from "lucide-react";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import {useSession} from "next-auth/react";
import {ProfileSubscriberAdd} from "@/actions/profile/friend/profile-friend-add";
import {ProfileSubscriberDelete} from "@/actions/profile/friend/profile-friend-delete";
import {IsSubscriberThisUser} from "@/actions/is-friend";

const ProfileHeader = ({user}: { user: UserWithSubscribers }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const {onOpen, onClose} = useModal();
  const router = useRouter();
  const {theme} = useTheme();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);

  const isOwner: boolean = currentUser.id === user.id;

  const handleMouseOver = (): void => {
    setIsHover(true);
  };

  const handleMouseOut = (): void => {
    setIsHover(false);
  };

  const handlerDelete = async () => {
    try {
      await ProfileAvatarDelete(user.id);

      toast({
        title: "Your avatar has been successfully deleted"
      });

      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  };

  const handlerAddSubscriber = async () => {
    try {
      await ProfileSubscriberAdd(user.id, currentUser.id);

      toast({
        title: "You have successfully added a new subscriber"
      });
      setIsSubscribed(prev => !prev);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  };

  const handlerDeleteSubscriber = async () => {
    try {
      await ProfileSubscriberDelete(user.id, currentUser.id);

      toast({
        title: "You have successfully deleted a subscriber"
      });
      setIsSubscribed(prev => !prev);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  };

  const ContextMenuItems: {
    label: string,
    icon: LucideIcon,
    isActive: boolean,
    handler: () => void
  }[] = useMemo(() => [
    {
      label: "Add",
      icon: Plus,
      isActive: !user.avatar,
      handler: () => onOpen("upload-avatar", {user}),
    },
    {
      label: "Edit",
      icon: Pencil,
      isActive: !!user.avatar,
      handler: () => onOpen("upload-avatar", {user}),
    },
    {
      label: "Delete",
      icon: Trash2,
      isActive: !!user.avatar,
      handler: () => onOpen("accept", {user}, () => handlerDelete()),
    },
  ], [user.avatar]);

  useEffect(() => {
    (async () => {
      if (isOwner) {
        return;
      }

      const subscriber = await IsSubscriberThisUser(user.id, currentUser.id);

      if (!subscriber.data) {
        setIsSubscribed(false);
        return;
      }

      setIsSubscribed(true);
    })();
  }, []);

  return (
    <div className="relative">
      <div
        className={cn("relative flex w-full h-72 rounded-xl", theme !== "light" && "mask")}
        onMouseOver={isOwner ? handleMouseOver : () => {
        }}
        onMouseOut={isOwner ? handleMouseOut : () => {
        }}
        style={user.banner ? {backgroundImage: `url(${user.banner})`, backgroundSize: "cover"}
          : {backgroundColor: "transparent"}}
      >
        {isHover &&
          <Button
            variant={"ghost"}
            className="absolute top-5 right-5 backdrop-blur animate-appear"
            onClick={() => onOpen("upload-banner", {user})}
          >
            Edit banner
          </Button>}
      </div>
      <div className="absolute -bottom-24 flex gap-x-4 w-full">
        {user.avatar &&
          <ProfileAvatar user={user} actions={ContextMenuItems} type={"default"}/>
        }
        <div className="self-end flex justify-between gap-x-2 pb-6 w-full">
          <div className="flex flex-col gap-y-3">
            <p className="text-xl">{user.username}</p>
            <p>{user.status}</p>
          </div>
          {!isOwner &&
            (!isSubscribed ?
              <Button onClick={() => handlerAddSubscriber()}>
                Subscribe
              </Button> :
              <Button onClick={() => handlerDeleteSubscriber()}>
                Unsubscribe
              </Button>)
          }
          {isOwner && <Button onClick={() => router.push("/edit")}>
            Edit profile
          </Button>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;