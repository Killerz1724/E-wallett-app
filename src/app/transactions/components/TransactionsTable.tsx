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
    </article>
  );
}
