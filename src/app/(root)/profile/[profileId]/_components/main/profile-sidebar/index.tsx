import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import Subscribers from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/subscribers";

const ProfileSidebar = ({user}: {user: UserWithSubscribers}) => {
  return (
    <Subscribers user={user} />
  );
};

export default ProfileSidebar;