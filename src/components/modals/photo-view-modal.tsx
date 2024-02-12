"use client";


import Image from "next/image";
import {useModal} from "@/hooks/use-modal";
import {Dialog, DialogContent} from "@/components/ui/dialog";

const PhotoViewModal = () => {
  const {isOpen, onClose, type, data} = useModal();

  const {photo} = data;

  const isOpenModal: boolean = isOpen && type === "photo-view";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="p-10">
        <Image src={photo?.photo!} alt={"Image"} width={500} height={500} />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoViewModal;