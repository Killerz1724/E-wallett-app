import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import useMutationToast from "../../../hooks/useMutationToast";
import { api } from "../../../lib/axios";
import type { ApiError, ApiResponse } from "../../../types/api";
import { UserResponses } from "../actions/action";
import type { loginDataType } from "../page";
import { useDispatch } from "react-redux";
import { setUser } from "store/userStore";

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

export function useUserDataGet() {
  const dispatch = useDispatch();
  // const res = useMutation<UserResponses, AxiosError<ApiError>>({
  //   mutationFn: async () => {
  //     const res = await api.get<ApiResponse<UserResponses>>("/profile/me");
  //     dispatch(setUser(res.data.data));
  //     return res.data.data;
  //   },
  // });
  const res = useQuery<UserResponses, AxiosError<ApiError>>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<UserResponses>>("/profile/me");
      dispatch(setUser(res.data.data));
      return res.data.data;
    },
  });

  return res;
}
