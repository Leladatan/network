import {User} from "@prisma/client";
import ProfileHeaderEdit from "@/app/(root)/edit/_components/profile-header-edit";
import ProfileMainEdit from "@/app/(root)/edit/_components/profile-main-edit";

const ProfileEditPage = ({user}: { user: Omit<User, "password"> }) => {
  return (
    <>
      <ProfileHeaderEdit user={user}/>
      <ProfileMainEdit user={user} />
    </>
  );
};

export default ProfileEditPage;