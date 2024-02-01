import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {getFormatData} from "@/utils/functions/format-data";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";

const PostComments = ({post}: {post: PostWithUser}) => {
  return (
    <>
      <Separator className="bg-accent-foreground my-4" />
      <div className="flex flex-col gap-y-4">
        {post.comments.map(comment => (
          <>
            <div key={comment.id} className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-4">
                <Link className="relative" href={`${origin}/profile/${comment.author.id}`}>
                  <Avatar>
                    <AvatarImage src={comment.author.avatar}/>
                    <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
                  </Avatar>
                  {post.author.online &&
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
                </Link>
                <h4><Link href={`${origin}/profile/${comment.author.id}`}>{comment.author.username}</Link></h4>
                <span className="text-neutral-400">{getFormatData(new Date(comment.createdAt))}</span>
              </div>
            </div>
            <div className="mb-2">
              <p>{comment.title}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default PostComments;