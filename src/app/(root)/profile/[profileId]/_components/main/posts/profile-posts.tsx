import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import ProfilePost from "@/app/(root)/profile/[profileId]/_components/main/posts/profile-post";

const ProfilePosts = ({posts}: { posts: PostWithUser[]}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {posts.map(post => (
        <ProfilePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePosts;