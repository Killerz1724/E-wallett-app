import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/Table";
import React from "react";
import { DummyTransactions } from "./dummyData";
import FilterTable from "./FilterTable";
import clsxm from "@riverfl0w/clsxm";

export type TransactionDataType = {
  page_info: PageInfo;
  transactions: Transaction[];
};

export type PageInfo = {
  current_page: number;
  total_rows: number;
  limit_data_per_page: number;
};

export type Transaction = {
  transaction_category: string;
  source_fund: string;
  description: string;
  amount: string;
  transaction_time: Date;
  recipent: string;
};

export default function TransactionsTable() {
  return (
    <article className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Transactions History</h3>
        <FilterTable />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DummyTransactions.map((transaction, i) => (
            <TableRow key={i}>
              <TableCell>{transaction.recipent}</TableCell>
              <TableCell>{transaction.transaction_category}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.source_fund}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                {transaction.transaction_time.toISOString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full gap-3 flex items-center justify-end">
        <button
          className={clsxm(
            "px-4 py-2 border bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 border-gray-300 rounded-md",
            "transition-all"
          )}
        >
          Previous
        </button>
        <p className="text-lg font-semibold">1/1</p>
        <button
          className={clsxm(
            "px-4 py-2 border bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 border-gray-300 rounded-md",
            "transition-all"
          )}
        >
          Next
        </button>
      </div>
    </article>
  );
}
