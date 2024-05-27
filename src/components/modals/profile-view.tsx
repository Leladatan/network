"use client";

import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useModal} from "@/hooks/use-modal";
import {useColor} from "@/hooks/use-color";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {Label} from "@/components/ui/label";
import {getBirthData} from "@/utils/functions/format-data";
import {Cake} from "lucide-react";
import {capitalizeFirstLetter} from "@/utils/functions/capitalize";
import Box from "@/components/ui/box";

const ProfileView = () => {
  const {isOpen, onClose, type, data} = useModal();
  const {color} = useColor();
  const {user} = data;

  const isOpenModal: boolean = isOpen && type === "profile-view";

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={cn("bg-background p-10", color)}>
        <DialogHeader className="flex flex-row gap-x-2">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatar!}/>
              <AvatarFallback><SkewLoader size={15} color="#36d7b7"/></AvatarFallback>
            </Avatar>
            {user.online && <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500"/>}
          </div>
          <div className="self-end flex flex-col items-start gap-y-2 pb-4">
            <h3>{user.username}</h3>
            {user.status && <p>{user.status}</p>}
          </div>
        </DialogHeader>
        {user.last_name && (
          <Label>
            Last name: {user.last_name}
          </Label>
        )}
        {user.first_name && (
          <Label>
            First name: {user.first_name}
          </Label>
        )}
        {user.gender && (
          <Label>
            Gender: {capitalizeFirstLetter(user.gender)}
          </Label>
        )}
        {user.birthday && (
          <Label className="flex items-center gap-x-2">
            Birthdate: {getBirthData(user.birthday)} <Cake size={20}/>
          </Label>
        )}
        {user.about && (
          <>
            <Label>
              About {user.username}:
            </Label>
            <Box>
              {user.about}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileView;