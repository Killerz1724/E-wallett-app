import { Popover, PopoverContent, PopoverTrigger } from "components/ui/Popover";
import { Info } from "lucide-react";
import React from "react";

export default function InfoPopout() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-all">
          <Info />
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={4} className="bg-black">
        <div className="text-white text-xs text-center space-y-2">
          <strong>Please note</strong>
          <p>due to limited resources, all data is reset every two days.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
