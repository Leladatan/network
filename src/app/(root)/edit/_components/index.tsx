import {User} from "@prisma/client";
import ProfileHeaderEdit from "@/app/(root)/edit/_components/profile-header-edit";

const ProfileEditPage = ({user}: {user: Omit<User, "password">}) => {
  return (
    <div>
      <div>
        <h2>Profile</h2>
      </div>
      <ProfileHeaderEdit user={user} />
    </div>
  );
};

export default ProfileEditPage;