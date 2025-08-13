import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import useMutationToast from "../../../hooks/useMutationToast";
import { api } from "../../../lib/axios";
import type { ApiError, ApiResponse } from "../../../types/api";
import type { loginDataType } from "../Login";

type LoginResponse = {
  access_token: string;
};

export function useLoginPost() {
  const res = useMutationToast(
    useMutation<LoginResponse, AxiosError<ApiError>, loginDataType>({
      mutationFn: async (payload) => {
        const res = await api.post<ApiResponse<LoginResponse>>(
          "/auth/login",
          payload
        );
        return res.data.data;
      },
    }),
    {
      success: "Succesfully login",
    }
  );

  return res;
}
