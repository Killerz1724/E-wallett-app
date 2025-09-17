import { Popover, PopoverContent, PopoverTrigger } from "components/ui/Popover";
import { Info } from "lucide-react";
import React from "react";

export default function HowToSpin() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-2 text-gray-400 hover:cursor-pointer hover:text-gray-300 items-center font-semibold">
          <Info className="text-gray-400 size-4" />
          <p>How to spin</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <p className="text-xs">
            Get 1 free spin for every IDR 1,000,000 top-up!
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
