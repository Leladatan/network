"use client";

import {useModal} from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ProfileDelete} from "@/actions/profile/profile-delete";
import {toast} from "@/components/ui/use-toast";
import {signOut} from "next-auth/react";
import {useColor} from "@/hooks/use-color";

const AcceptDangerZoneModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const {color} = useColor();
  const {user} = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpenModal: boolean = isOpen && type === "accept-danger-zone";

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      if (user) {
        await ProfileDelete(user.id).then(() => {
          toast({
            title: "Your account has been successfully deleted"
          });
        });
      }

      await signOut();
    } catch (err) {
      toast({
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={color}>
        <DialogHeader>
          <DialogTitle className="text-primary">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} className="text-primary-foreground" onClick={onClose}>Cancel</Button>
          <Button disabled={isLoading} className="text-primary-foreground" onClick={handleDelete}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDangerZoneModal;