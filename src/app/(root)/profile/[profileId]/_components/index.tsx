import {User} from "@prisma/client";

const ProfileIdPage = (user: Omit<User, "password">) => {
  return (
    <div>
      {user.username}
    </div>
  );
};

export default ProfileIdPage;