"use client";

import {Textarea} from "@/components/ui/textarea";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";

type props = {
  isEdit: boolean;
  isLoading: boolean;
  post: PostWithUser;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handlerActions: (userId: string, postId: string, type: "edit" | "delete", title?: string) => Promise<void>;
};

const PostContent = ({handlerActions, isEdit, setIsEdit, post, isLoading}: props) => {
  const [value, setValue] = useState<string>(post.title);


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
          <div className="self-end flex gap-x-4">
            <Button
              disabled={isLoading}
              onClick={() => setIsEdit(false)}
              className="self-end"
              size={"sm"}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => handlerActions(post.userId, post.id, "edit", value)}
              size={"sm"}
            >
              Save
            </Button>
          </div>
        </>
        :
        <p className="break-all">{post.title}</p>
      }
      {post.isEdited && <span className="self-end italic text-neutral-600">(edit)</span>}
    </div>
  );
};

export default PostContent;