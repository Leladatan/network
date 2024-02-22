"use client";

import {SkewLoader} from "react-spinners";
import {useColor} from "@/hooks/use-color";
import {colorsWithHex} from "@/utils/constants/colors";

const Loader = () => {
  const {color} = useColor();
  const colorUI = colorsWithHex.find(hex => hex.label === color);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <SkewLoader color={colorUI?.loader || "black"}/>
    </div>
  );
};

export default Loader;