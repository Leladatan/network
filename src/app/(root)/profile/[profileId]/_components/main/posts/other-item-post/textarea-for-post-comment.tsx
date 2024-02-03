"use client";

import {Textarea} from "@/components/ui/textarea";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {Button} from "@/components/ui/button";
import {PostCommentAdd} from "@/actions/profile/post/comment/post-comment-add";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Dispatch, SetStateAction, useState} from "react";

type props = {
  setIsComment: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  postId: string;
  currentUser: string;
  authorId: string;
}

const TextareaForPostComment = ({isLoading, setIsLoading, setIsComment, postId, currentUser, authorId}: props) => {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const commentAdd = async (userId: string, postId: string) => {
    try {
      setIsLoading(true);
      await PostCommentAdd(userId, postId, {title: comment, userId: authorId});
      setIsComment(false);
      toast({
        title: "Comment created"
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

  const handleComment = (): void => {
    setIsComment(prev => !prev);
  };

  return (
    <>
      <Textarea
        disabled={isLoading}
        className="max-h-[200px] transition"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter the comment of the post"
        maxLength={maxLengthForPostTitle}
      />
      <div className="self-end flex gap-x-4">
        <Button
          disabled={isLoading}
          onClick={() => handleComment()}
          className="self-end"
          size={"sm"}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => commentAdd(currentUser, postId)}
          size={"sm"}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default TextareaForPostComment;