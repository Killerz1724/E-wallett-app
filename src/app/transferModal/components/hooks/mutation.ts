import { useMutation } from "@tanstack/react-query";
import { PageInfo } from "app/transactions/hooks/mutation";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";

export interface UsersTypeRes {
  page_info: PageInfo;
  users: User[];
}

export interface User {
  wallet_id: number;
  img_url: string;
  username: string;
}

export function useUserListGet() {
  const res = useMutation<UsersTypeRes, AxiosError<ApiError>, string>({
    mutationFn: async (payload) => {
      const res = await api.get<ApiResponse<UsersTypeRes>>(
        `/users?search=${payload}`
      );
      return res.data.data;
    },
  });

  return res;
}
