"use client";


import Image from "next/image";
import {useModal} from "@/hooks/use-modal";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useColor} from "@/hooks/use-color";

const PhotoViewModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const {color} = useColor();
  const {photo} = data;

  const isOpenModal: boolean = isOpen && type === "photo-view";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={cn("p-10", color)}>
        <Image src={photo!} alt={"Image"} width={500} height={500} />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoViewModal;