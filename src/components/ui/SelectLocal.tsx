import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { SelectProps } from "@radix-ui/react-select";

export type SelectLocalProps = {
  placeholder: string;
  options: { label: string; value: string }[];
} & React.ComponentProps<React.FC<SelectProps>>;

export default function SelectLocal({
  placeholder,
  ...prop
}: SelectLocalProps) {
  return (
    <Select {...prop}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {prop.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
