import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import { useEffect } from "react";
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";
import { toast } from "react-toastify";

export default function useMutationToast<T, K>(
  mutation: UseMutationResult<T, AxiosError<ApiError>, K>
) {
  const { isPending, isSuccess, isError, error } = mutation;

  const toastId = "mutation-toast-id";

  useEffect(() => {
    const toastMessage = {
      ...DEFAULT_TOAST_MESSAGE,
    };

    if (isError) {
      toast.error(
        typeof toastMessage.error === "string"
          ? toastMessage.error
          : toastMessage.error(error),
        {
          toastId: toastId,
        }
      );
    } else if (isPending) {
      toast.loading(toastMessage.loading, {
        toastId: toastId,
      });
    } else if (isSuccess) {
      toast.success(toastMessage.success, {
        toastId: toastId,
      });
    }
  }, [isError, isPending, error, isSuccess, toastId]);

  return { ...mutation };
}
