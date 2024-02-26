"use client";

import {cn} from "@/lib/utils";
import React from "react";
import {useColor} from "@/hooks/use-color";

const Box = ({className, children}: {className?: string, children: React.ReactNode}) => {
  const {color} = useColor();

  return (
    <div className={cn(`${color} p-5 bg-primary/20 rounded-xl`, className)}>
      {children}
    </div>
  );
};

export default Box;