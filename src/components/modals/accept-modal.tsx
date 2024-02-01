"use client";

import {useModal} from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent, DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const AcceptModal = () => {
  const {isOpen, onClose, type, func} = useModal();

  const isOpenModal: boolean = isOpen && type === "accept";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            If you confirm this action, you will not be able to restore the data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={func}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptModal;