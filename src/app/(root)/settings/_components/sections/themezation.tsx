"use client";

import {ThemeToggle} from "@/components/theme-toggle";
import ColorToggle from "@/components/color-toggle";

const Themezation = () => {
  return (
    <section className="flex flex-col gap-y-3">
      <h3>Themization</h3>
      <div className="flex items-center gap-x-4">
        <ThemeToggle/>
        <ColorToggle/>
      </div>
    </section>
  );
};

export default Themezation;