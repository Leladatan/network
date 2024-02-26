"use client";

import {Textarea} from "@/components/ui/textarea";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import Image from "next/image";
import {useModal} from "@/hooks/use-modal";
import {Paperclip, XIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type props = {
  isEdit: boolean;
  isLoading: boolean;
  post: PostWithUser;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handlerActions: (userId: string, postId: string, type: "edit" | "delete", title?: string, photo?: string | null) => Promise<void>;
};

const PostContent = ({handlerActions, isEdit, setIsEdit, post, isLoading}: props) => {
  const [value, setValue] = useState<string>(post.title);
  const [postPhoto, setPostPhoto] = useState<string | null>(post.photo);
  const {onOpen} = useModal();

  const handlerPhoto = (photo: string | undefined): void => {
    if (!photo) {
      setPostPhoto("");
      return;
    }

    setPostPhoto(photo);
  };

  return (
    <div className="flex flex-col gap-y-4 px-4 pb-4">
      {isEdit ?
        <>
          <Textarea
            disabled={isLoading}
            className="max-h-[200px] transition"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter the text of the post"
            maxLength={maxLengthForPostTitle}
          />
          {postPhoto && <div className="relative w-fit h-fit">
            <Image src={postPhoto} alt={"Image in post"} width={150} height={150} className={"rounded-xl"}/>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={"ghost"} onClick={() => setPostPhoto("")}
                          className="absolute top-0 right-0 text-rose-500 hover:text-primary-foreground">
                    <XIcon/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>}
          <div className="self-end flex items-center gap-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="group cursor-pointer"
                          onClick={() => onOpen("upload-post-photos", {}, (values: string | undefined) => handlerPhoto(values))}>
                    <Paperclip
                      className="text-primary-foreground/50 group-hover:text-primary transition"
                      size={20}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Attach a file
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              disabled={isLoading}
              onClick={() => setIsEdit(false)}
              className="self-end"
              size={"sm"}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading && (!value || !postPhoto)}
              onClick={() => handlerActions(post.userId, post.id, "edit", value, postPhoto)}
              size={"sm"}
            >
              Save
            </Button>
          </div>
        </>
        :
        <>
          <p className="break-all">{post.title}</p>
          {post.photo && <Image src={post.photo} alt={"Image in post"} width={200} height={200}
                                onClick={() => onOpen("photo-view", {photo: post.photo!})}
                                className="rounded-xl cursor-pointer"/>}
        </>
      }
      {post.isEdited && <span className="self-end italic text-primary-foreground/50">(edit)</span>}
    </div>
  );
};

export default PostContent;