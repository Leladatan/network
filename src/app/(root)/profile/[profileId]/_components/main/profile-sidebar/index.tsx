import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import FriendsList from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/friends/friends-list";
import SubscribersList
  from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/subscribers/subscribers-list";
import PhotosList from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/photos/photos-list";
import MusicsList from "@/app/(root)/profile/[profileId]/_components/main/profile-sidebar/musics/musics-list";
import {MusicListType} from "@/app/(root)/music/page";

const ProfileSidebar = ({user, musics}: {user: UserWithSubscribers, musics: MusicListType[]}) => {
  return (
    <>
      <PhotosList photos={user.photos} />
      <FriendsList user={user} />
      <SubscribersList user={user} />
      <MusicsList musics={musics} />
    </>
  );
};

export default ProfileSidebar;