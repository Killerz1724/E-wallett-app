import Button from "components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import React from "react";

export default function TransferModalContent() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h5 className="text-3xl font-bold">Transfer</h5>
      <form action="" className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="source-fund" className="font-semibold text-sm">
            Select Recipient
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80000002">Loki</SelectItem>
              <SelectItem value="80000004">Thor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="source-fund" className="font-semibold text-sm">
            Amount
          </label>
          <input
            type="number"
            placeholder="ex: 10000"
            step={0.01}
            className="w-full border-1 border-gray-300 rounded-md p-2"
          />
        </div>

        <Button className="py-2">Transfer</Button>
      </form>
    </div>
  );
}
