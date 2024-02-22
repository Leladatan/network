"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {useModal} from "@/hooks/use-modal";
import {MusicListType} from "@/app/(root)/music/page";

const MultiSelect = ({name, placeholder, options}: { name: string, placeholder: string, options: MusicListType[] }) => {
  const [values, setValues] = useState<string[]>([]);
  const {onOpen} = useModal();

  const value: string = values.toString();

  const onChange = (id: string): void => {
    if (values.includes(id)) {
      setValues(values.filter(item => item !== id));
      return;
    }

    setValues(prev => ([...prev, id]));
  };

  return (
    <Input name={name} value={value} placeholder={placeholder} onClick={() => onOpen("playlist-music-select", {userMusics: options})}/>
  );
};

export default MultiSelect;