"use client";

import {Slider} from "@/components/ui/slider";

const MusicTrackSlider = ({currTime, time, duration, value, onChange}: {
  currTime: { min: string, sec: string },
  time: { min: string, sec: string },
  duration: number,
  value: number,
  onChange: (newValue: [number]) => void
}) => {
  return (
    <div className="w-11/12 flex items-center justify-between gap-x-3">
      <p className="text-primary-foreground truncate text-xs w-[30px] text-center">
        {currTime.min}:{currTime.sec.length === 1 ? "0" + currTime.sec : currTime.sec}
      </p>
      <Slider
        value={[value]}
        onValueChange={onChange}
        min={0}
        max={duration / 1000}
        step={1}
      />
      <p className="text-primary-foreground truncate text-xs w-[30px] text-center">
        {time.min}:{time.sec.length === 1 ? "0" + time.sec : time.sec}
      </p>
    </div>
  );
};

export default MusicTrackSlider;