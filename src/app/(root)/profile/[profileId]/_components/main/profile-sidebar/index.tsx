import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import FriendsList from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/friends/friends-list";
import SubscribersList
  from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/subscribers/subscribers-list";
import PhotosList from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/photos/photos-list";

const ProfileSidebar = ({user}: {user: UserWithSubscribers}) => {
  return (
    <>
      <PhotosList photos={user.photos} />
      <FriendsList user={user} />
      <SubscribersList user={user} />
    </>
  );
};

export default ProfileSidebar;