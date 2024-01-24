"use client";

import {colorsWithHex} from "@/utils/constants/colors";
import {cn} from "@/lib/utils";
import {Color} from "@/types/theme";
import {useColor} from "@/hooks/use-color";
import {useLocalStorage} from "@/hooks/use-local-storage";
import {useState} from "react";

const ColorToggle = () => {
  const {getLocalStorage, setLocalStorage} = useLocalStorage();
  const [currentColor, setCurrentColor] = useState<string | null>(() => getLocalStorage("social-color"));
  const {setColor} = useColor();

  const handleTheme = (value: Color): void => {
    setColor(value);
    setCurrentColor(value);
    return setLocalStorage({key: "social-color", value});
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h3>Change color:</h3>
      <div className="flex items-center gap-x-2">
        {colorsWithHex.map((color, index) => (
          <div
            key={index}
            onClick={() => handleTheme(color.label)}
            className={cn("w-8 h-8 rounded-full cursor-pointer hover:border transition",
              color.bg,
              currentColor === color.label && "border-2"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorToggle;