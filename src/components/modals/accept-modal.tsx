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
import {MouseEventHandler} from "react";
import {useColor} from "@/hooks/use-color";

const AcceptModal = () => {
  const {isOpen, onClose, type, func} = useModal();
  const {color} = useColor();
  const onContinue = func as unknown as MouseEventHandler<HTMLButtonElement>;

  const isOpenModal: boolean = isOpen && type === "accept";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={color}>
        <DialogHeader>
          <DialogTitle className="text-primary">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            If you confirm this action, you will not be able to restore the data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="text-primary-foreground">Cancel</Button>
          <Button onClick={onContinue} className="text-primary-foreground">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptModal;