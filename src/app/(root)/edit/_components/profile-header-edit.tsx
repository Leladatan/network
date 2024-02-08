"use client";

import {Button} from "@/components/ui/button";
import ProfileAvatar from "@/app/(root)/profile/[profileId]/_components/header/profile-avatar";
import {useModal} from "@/hooks/use-modal";
import {useRouter} from "next/navigation";
import {ChangeEvent, useMemo, useState} from "react";
import {ProfileAvatarDelete} from "@/actions/profile/avatar/profile-avatar-delete";
import {toast} from "@/components/ui/use-toast";
import {LucideIcon, Pencil, Plus, Trash2} from "lucide-react";
import {User} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";
import {ProfileOptions} from "@/actions/profile/profile-options";

const ProfileHeaderEdit = ({user}: { user: Omit<User, "password"> }) => {
  const {onOpen, onClose} = useModal();
  const router = useRouter();
  const [status, setStatus] = useState<string>(user.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {theme} = useTheme();

  const handleStatus = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatus(e.target.value);
  };

  const handleSaveOptions = async () => {
    try {
      setIsLoading(true);

      await ProfileOptions(user.id, status);

      toast({
        title: "Save"
      });

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

  return (
    <div className="relative">
      <div
        className={cn("relative flex w-full h-72 rounded-xl", theme !== "light" && "mask")}
        style={user.banner ? {backgroundImage: `url(${user.banner})`, backgroundSize: "cover", backgroundPosition: "center"}
          : {backgroundColor: "transparent"}}
      >
        <Button
          variant={"ghost"}
          className="absolute top-5 right-5 backdrop-blur animate-appear"
          onClick={() => onOpen("upload-banner", {user})}
        >
          Edit banner
        </Button>
      </div>
      <div className="absolute -bottom-28 flex gap-x-4 w-full">
        {user.avatar &&
          <ProfileAvatar user={user} actions={ContextMenuItems} type={"edit"}/>
        }
        <div className="self-end flex justify-between gap-x-2 pb-6 w-full">
          <div className="flex flex-col gap-y-3">
            <p className="text-xl">{user.username}</p>
            <Input disabled={isLoading} value={status} onChange={handleStatus} placeholder={"How is your mood?"} />
          </div>
          <Button disabled={isLoading} onClick={handleSaveOptions}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
    ;
};

export default ProfileHeaderEdit;