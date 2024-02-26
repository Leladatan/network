import {User} from "@prisma/client";
import Box from "@/components/ui/box";
import AccountSettings from "@/app/(root)/edit/_components/sections/account-settings";

const ProfileMainEdit = ({user}: {user: Omit<User, "password">}) => {
  return (
   <Box className="mt-36">
     <AccountSettings id={user.id} email={user.email} username={user.username}/>
   </Box>
  );
};

export default ProfileMainEdit;