"use client";

import {useModal} from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";

const AcceptModal = () => {
  const {isOpen, onClose, type, data} = useModal();

  const {user} = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpenModal: boolean = isOpen && type === "accept";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={onClose}>Cancel</Button>
          <Button disabled={isLoading}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptModal;