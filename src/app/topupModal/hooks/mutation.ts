import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";

export type SoureOfFundsResponse = {
  id: number;
  name: string;
}[];

export function useSourceOfFundsGet() {
  const res = useQuery<SoureOfFundsResponse, AxiosError<ApiError>>({
    queryKey: ["source-of-funds"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SoureOfFundsResponse>>(
        "/users/transactions/source-funds"
      );
      return res.data.data;
    },
  });

  return res;
}
