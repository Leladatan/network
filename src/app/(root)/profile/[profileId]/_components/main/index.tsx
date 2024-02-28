"use client";

import {ChangeEvent, useState} from "react";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/components/ui/use-toast";
import {ProfilePostAdd} from "@/actions/profile/post/profile-post-add";
import {useRouter} from "next/navigation";
import ProfilePosts from "@/app/(root)/profile/[profileId]/_components/main/posts/profile-posts";
import {PostWithUser, SubscribersOnlineWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import {useSession} from "next-auth/react";
import ProfileSidebar from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar";
import {Paperclip} from "lucide-react";
import {useModal} from "@/hooks/use-modal";
import Image from "next/image";
import {useColor} from "@/hooks/use-color";
import {cn} from "@/lib/utils";
import {MusicListType} from "@/app/(root)/music/page";
import Box from "@/components/ui/box";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const ProfileMain = ({posts, user, subscribers_online, musics}: {
  posts: PostWithUser[],
  user: UserWithSubscribers,
  subscribers_online: SubscribersOnlineWithUser[],
  musics: MusicListType[]
}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [photo, setPhoto] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {onOpen} = useModal();
  const router = useRouter();

  const isOwner: boolean = currentUser.id === user.id;

  const {color} = useColor();

  const handlerPhoto = (value: string | undefined): void => {
    if (!value) {
      setPhoto("");
      return;
    }

    setPhoto(value);
  };

  const handlerValue = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  const handlerFocus = (): void => {
    setIsFocus(true);
  };

  const handlerBlur = (): void => {
    setIsFocus(false);
  };

  const handlePostAdd = async () => {
    try {
      setIsLoading(true);

      await ProfilePostAdd(user.id, {title: value, userId: user.id, authorId: currentUser.id, photo});

      toast({
        title: "Your record has been successfully tested"
      });

      setValue("");
      setIsFocus(false);
      setPhoto("");
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

  return (
    <main className={cn("flex gap-x-10 w-full mt-32", color)}>
      <div className="flex flex-col gap-y-4 w-1/2">
        <Box className="flex flex-col gap-y-3">
          {isOwner && (
            <>
              <Textarea
                disabled={isLoading}
                className="max-h-[200px] transition"
                value={value}
                onFocus={handlerFocus}
                onBlur={handlerBlur}
                onChange={(e) => handlerValue(e)}
                placeholder={"What's new for you?"}
                maxLength={maxLengthForPostTitle}
              />
              {photo && (
                <Image src={photo} alt={"Image in post"} width={50} height={50}/>
              )}
              <div className="flex items-center justify-end gap-x-4">
                {value && (
                  <p className="text-primary-foreground/80">{value.length}/{maxLengthForPostTitle}</p>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="group flex items-center justify-center cursor-pointer"
                      >
                        <Paperclip className="text-primary-foreground/50 group-hover:text-primary transition" size={20}
                                   onClick={() => onOpen("upload-post-photos", {}, (values: string | undefined) => handlerPhoto(values))}/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Attach a file
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {(isFocus || value || photo) && <Button
                  onClick={handlePostAdd}
                  disabled={isLoading}
                  size={"sm"}
                  className="self-end w-1/2 animate-appear"
                >
                  To publish
                </Button>
                }
              </div>
            </>
          )}
        </Box>
        <ProfilePosts posts={posts}/>
      </div>
      <div className="flex flex-col gap-y-3 w-1/2">
        <ProfileSidebar user={user} musics={musics}/>
      </div>
    </main>
  );
};

export default ProfileMain;