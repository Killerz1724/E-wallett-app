import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useMutationToast from "hooks/useMutationToast";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";
import { number } from "zod";

export type PrizeGachaTypeRes = {
  prize_id: number;
  prize_amount: number;
  prize_angle?: number;
};
export type RewardsTypeRes = {
  prizes: Prize[];
};

export type Prize = {
  prize_id: number;
  prize_amount: number;
  prize_weight: number;
};

export function useGetRewards() {
  const res = useQuery<RewardsTypeRes, AxiosError<ApiError>>({
    queryKey: ["rewards"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<RewardsTypeRes>>(
        "/users/transactions/rewards"
      );

      return res.data.data;
    },
  });

  return res;
}

export function useGetGacha() {
  const res = useMutationToast(
    useMutation<PrizeGachaTypeRes, AxiosError<ApiError>>({
      mutationFn: async () => {
        const res = await api.get<ApiResponse<PrizeGachaTypeRes>>(
          "/users/transactions/gacha"
        );
        return res.data.data;
      },
    })
  );

  return res;
}
