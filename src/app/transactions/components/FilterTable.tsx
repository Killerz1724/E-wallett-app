import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  setUserTransactionsOrder,
  setUserTransactionsSort,
} from "store/userStore";

export default function FilterTable() {
  const filterState = useSelector(
    (state: RootState) => state.user.userTransactions
  );
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Sort by</p>
        <Select
          onValueChange={(value) => dispatch(setUserTransactionsSort(value))}
          defaultValue={filterState.sort}
          value={filterState.sort}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recipient">Recipient</SelectItem>
            <SelectItem value="transaction_date">Transaction Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold">Order by</p>
        <Select
          onValueChange={(value) => dispatch(setUserTransactionsOrder(value))}
          defaultValue={filterState.order}
          value={filterState.order}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
