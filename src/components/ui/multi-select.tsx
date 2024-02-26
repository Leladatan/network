"use client";

import {Input} from "@/components/ui/input";
import {useModal} from "@/hooks/use-modal";
import {Music} from "@prisma/client";

const MultiSelect = ({name, placeholder, options}: { name: string, placeholder: string, options: Music[] }) => {
  const {onOpen} = useModal();
  const value: string = options.map(item => item.title).toString();

  return (
    <Input name={name} value={value} placeholder={placeholder} onClick={() => onOpen("playlist-music-select", {selectedMusic: options})}/>
  );
};

export default MultiSelect;