"use client";
import SkeletonLoading from "components/SkeletonLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/Table";
import { COMMON_ERROR } from "constant/common";
import { useTransactionsGet } from "../hooks/mutation";
import FilterTable from "./FilterTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { formatDate } from "utils/formatDate";
import Pagination from "components/ui/Pagination";
import { setUserTransactionsPage } from "store/userStore";

export default function TransactionsTable() {
  const transactionStates = useSelector(
    (state: RootState) => state.user.userTransactions
  );
  const { data, isPending, isError, refetch } = useTransactionsGet();
  const dispatch = useDispatch();
  useEffect(() => {
    refetch();
  }, [
    transactionStates.order,
    transactionStates.page,
    transactionStates.sort,
    refetch,
  ]);
  return (
    <article className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Transactions History</h3>
        <FilterTable />
      </div>
      {isError ? (
        <p>{COMMON_ERROR}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {isPending
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableHead key={i}>
                      <SkeletonLoading />
                    </TableHead>
                  ))
                : !isError && (
                    <>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction Time</TableHead>
                    </>
                  )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <>
              {isPending ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i + "Tr"}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <SkeletonLoading />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isError ? (
                <p>{COMMON_ERROR}</p>
              ) : data.page_info.total_rows > 0 ? (
                data.transactions.map((transaction, i) => (
                  <TableRow key={i}>
                    <TableCell>{transaction.invoice_number}</TableCell>
                    <TableCell>{transaction.recipent}</TableCell>
                    <TableCell>{transaction.transaction_category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.source_fund}</TableCell>
                    <TableCell>
                      {Number(transaction.amount).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {formatDate(transaction.transaction_time)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No Data</TableCell>
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      )}
      {data && (
        <Pagination
          limit={data.page_info.limit_data_per_page}
          page={data.page_info.current_page}
          total={data.page_info.total_rows}
          next={() =>
            dispatch(setUserTransactionsPage(data.page_info.current_page + 1))
          }
          previous={() =>
            dispatch(setUserTransactionsPage(data.page_info.current_page - 1))
          }
        />
      )}
    </article>
  );
}
