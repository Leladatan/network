import {User} from "@prisma/client";
import Box from "@/components/ui/box";
import AccountSettings from "@/app/(root)/edit/_components/sections/account-settings";
import AccountInfo from "@/app/(root)/edit/_components/sections/account-info";

const ProfileMainEdit = ({user}: {user: Omit<User, "password">}) => {
  return (
   <div className="flex flex-col gap-y-5">
     <Box className="mt-36">
       <AccountSettings id={user.id} email={user.email} username={user.username}/>
     </Box>
     <Box>
        <AccountInfo id={user.id} last_name={user.last_name} first_name={user.first_name} about={user.about} birthday={user.birthday} gender={user.gender} />
     </Box>
   </div>
  );
};

export default ProfileMainEdit;