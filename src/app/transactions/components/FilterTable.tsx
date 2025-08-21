import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import React from "react";

export default function FilterTable() {
  return (
    <div className="flex gap-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Sort by</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Recipient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recipient">Recipient</SelectItem>
            <SelectItem value="transaction_date">Transaction Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold">Order by</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Asc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Asc">Asc</SelectItem>
            <SelectItem value="Desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
