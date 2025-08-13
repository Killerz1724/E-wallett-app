import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import { useEffect } from "react";
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";
import { toast } from "react-toastify";

export default function useMutationToast<T, K>(
  mutation: UseMutationResult<T, AxiosError<ApiError>, K>,
  customMessage?: { error?: string; success?: string }
) {
  const { isPending, isSuccess, isError, error } = mutation;

  const toastId = "mutation-toast-id";

  useEffect(() => {
    const toastMessage = {
      ...DEFAULT_TOAST_MESSAGE,
      ...customMessage,
    };

    if (isError) {
      toast.update(toastId, {
        render:
          typeof toastMessage.error === "string"
            ? toastMessage.error
            : toastMessage.error(error),
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
    if (isPending) {
      toast.loading(toastMessage.loading, {
        toastId: toastId,
      });
    }
    if (isSuccess) {
      toast.update(toastId, {
        type: "success",
        render: toastMessage.success,
        isLoading: false,
        autoClose: 2000,
      });
    }
  }, [isError, isPending, error, isSuccess, toastId, customMessage]);

  return { ...mutation };
}
