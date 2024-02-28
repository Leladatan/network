"use client";

import {Input} from "@/components/ui/input";
import {useModal} from "@/hooks/use-modal";
import {Music} from "@prisma/client";

const MultiSelect = ({name, placeholder, options, type}: { name: string, placeholder: string, options: Music[], type: "edit" | "add" }) => {
  const {onOpen} = useModal();
  const value: string = options.map(item => item.title).toString();

  const onClick = (): void => {
    if (type === "edit") {
      onOpen("playlist-music-select-edit", {selectedMusic: options});
    }

    onOpen("playlist-music-select", {selectedMusic: options});
  };

  return (
    <Input name={name} value={value} placeholder={placeholder} onClick={onClick}/>
  );
};

export default MultiSelect;