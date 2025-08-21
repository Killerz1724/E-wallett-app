import { Popover, PopoverContent, PopoverTrigger } from "components/ui/Popover";
import React from "react";

export default function SelectRecipient() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <input type="text" placeholder="select recepient" />
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li>Loki</li>
          <li>Thor</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
