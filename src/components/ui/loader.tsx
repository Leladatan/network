"use client";

import {SkewLoader} from "react-spinners";
import {useColor} from "@/hooks/use-color";
import {colorsWithHex} from "@/utils/constants/colors";
import {cn} from "@/lib/utils";

const Loader = ({className = ""}: {className?: string}) => {
  const {color} = useColor();
  const colorUI = colorsWithHex.find(hex => hex.label === color);

  return (
    <div className={cn("flex items-center justify-center w-full h-screen", className)}>
      <SkewLoader color={colorUI?.loader || "black"}/>
    </div>
  );
};

export default Loader;