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
import {ProfileSubscriberAdd} from "@/actions/profile/subscribe/profile-subscribe-add";
import {ProfileSubscriberDelete} from "@/actions/profile/subscribe/profile-subscribe-delete";
import {isFriendThisUser, IsSubscriberThisUser} from "@/actions/is-friend";
import {rotate} from "next/dist/server/lib/squoosh/impl";
import {useColor} from "@/hooks/use-color";

const ProfileHeader = ({user}: { user: UserWithSubscribers }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const {onOpen, onClose} = useModal();
  const router = useRouter();
  const {theme} = useTheme();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [isFriended, setIsFriended] = useState<boolean>(true);

  const {color} = useColor();

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

      try {
        const subscriber = await IsSubscriberThisUser(user.id, currentUser.id);

        if (!subscriber.data) {
          setIsSubscribed(false);
          return;
        }

        setIsSubscribed(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isOwner) {
        return;
      }

      try {
        const friend = await isFriendThisUser(user.id, currentUser.id);

        if (!friend.data) {
          setIsFriended(false);
          return;
        }

        setIsFriended(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className={cn("relative", color)}>
      <div
        className={cn("relative flex w-full h-72 rounded-xl", theme !== "light" && "mask")}
        onMouseOver={isOwner ? handleMouseOver : () => {
        }}
        onMouseOut={isOwner ? handleMouseOut : () => {
        }}
        style={user.banner ? {backgroundImage: `url(${user.banner})`, backgroundSize: "cover", backgroundPosition: "center"}
          : {backgroundColor: "transparent"}}
      >
        {isHover &&
          <Button
            variant={"ghost"}
            className="absolute top-5 right-5 backdrop-blur animate-appear"
            onClick={() => onOpen("upload-banner", {user})}
          >
            Edit banner
          </Button>
        }
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
          {((!isOwner && !isLoading) && !isFriended) ?
            !isSubscribed ?
                <Button disabled={isLoading} onClick={() => handlerAddSubscriber()}>
                  Subscribe
                </Button> :
                <Button disabled={isLoading} onClick={() => handlerDeleteSubscriber()}>
                  Unsubscribe
                </Button>
            :
            (isFriended && !isOwner) &&
              <Button disabled={isLoading}>
                Remove from Friends
              </Button>
          }
          {isOwner &&
            <Button onClick={() => router.push("/edit")}>
              Edit profile
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;