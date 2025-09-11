"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ApiError, ApiResponse } from "types/api";

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
  invoice_number: string;
  transaction_category: string;
  source_fund: string;
  description: string;
  amount: number;
  transaction_time: string;
  sender: string;
  recipent: string;
};

export function useTransactionsGet() {
  const { sort, page, order } = useSelector(
    (state: RootState) => state.user.userTransactions
  );

  const sortQ = sort && `sort_by=${sort}&`;
  const orderQ = order && `order_by=${order}&`;
  const pageQ = page ? page : 1;
  const res = useQuery<TransactionDataType, AxiosError<ApiError>>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TransactionDataType>>(
        `/users/transactions?page=${pageQ}&limit=8&${sortQ}${orderQ}`
      );

      return res.data.data;
    },
  });

  return res;
}
