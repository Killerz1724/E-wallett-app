"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";

export type IncomeResponse = {
  total_income: number;
};

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
