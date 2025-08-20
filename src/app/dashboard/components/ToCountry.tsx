import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import React from "react";

export default function ToCountry() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="To" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="IDR">IDR</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
      </SelectContent>
    </Select>
  );
}
