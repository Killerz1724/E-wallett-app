"use client";
import { useQuery } from "@tanstack/react-query";
import { UserResponses } from "app/login/actions/action";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";

export type IncomeResponse = {
  total_income: number;
};

export type ExpenseResponse = {
  total_expense: number;
};

export function useBalanceGet() {
  const res = useQuery<UserResponses, AxiosError<ApiError>>({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<UserResponses>>(`/profile/me`);
      return res.data.data;
    },
  });

  return res;
}

export function useIncomesGet() {
  const res = useQuery<IncomeResponse, AxiosError<ApiError>>({
    queryKey: ["incomes"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<IncomeResponse>>(`/profile/income`);

      return res.data.data;
    },
  });

  return res;
}

export function useExpenseGet() {
  const res = useQuery<ExpenseResponse, AxiosError<ApiError>>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ExpenseResponse>>(
        `/profile/expense`
      );

      return res.data.data;
    },
  });

  return res;
}
