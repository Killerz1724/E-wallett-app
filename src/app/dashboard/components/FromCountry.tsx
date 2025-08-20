import { SelectValue } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "components/ui/Select";
import React from "react";

export default function FromCountry() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="From" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="IDR">IDR</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
      </SelectContent>
    </Select>
  );
}
