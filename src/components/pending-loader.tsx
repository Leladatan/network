"use client";

import {ScaleLoader} from "react-spinners";
import {useColor} from "@/hooks/use-color";
import {colorsWithHex} from "@/utils/constants/colors";
import Box from "@/components/ui/box";

const PendingLoader = () => {
  const {color} = useColor();
  const colorUI = colorsWithHex.find(hex => hex.label === color);

  return (
      <Box className="flex items-center justify-center h-full w-full">
        <ScaleLoader color={colorUI?.loader || "black"}/>
      </Box>
  );
};

export default PendingLoader;