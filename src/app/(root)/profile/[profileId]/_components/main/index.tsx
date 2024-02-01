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

const ProfileMain = ({posts, user, subscribers_online}: {
  posts: PostWithUser[],
  user: UserWithSubscribers,
  subscribers_online: SubscribersOnlineWithUser[]
}) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };

  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const isOwner: boolean = currentUser.id === user.id;

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

      await ProfilePostAdd(user.id, {title: value, userId: user.id, authorId: currentUser.id});

      toast({
        title: "Your record has been successfully tested"
      });

      setValue("");
      setIsFocus(false);
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
    <main className="flex gap-x-10 w-full mt-32">
      <div className="flex flex-col gap-y-4 w-1/2">
        {isOwner && (
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
        )}
        {(isFocus || value) && <Button
          onClick={handlePostAdd}
          disabled={isLoading}
          size={"sm"}
          className="self-end w-1/2 animate-appear"
        >
          To publish
        </Button>
        }
        <ProfilePosts posts={posts}/>
      </div>
      <div className="flex flex-col gap-y-3 w-1/2">
        <ProfileSidebar user={user} />
      </div>
    </main>
  );
};

export default ProfileMain;