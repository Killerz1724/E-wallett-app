import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";
import useMutationToast from "./useMutationToast";
import { useDispatch } from "react-redux";
import { setProfileImage } from "store/userStore";

type UpdateProfileImgRes = {
  img_url: string;
};

export function useProfileImgPatch() {
  const dispatch = useDispatch();
  const res = useMutationToast(
    useMutation<UpdateProfileImgRes, AxiosError<ApiError>, FormData>({
      mutationFn: async (payload) => {
        const res = await api.patch<ApiResponse<UpdateProfileImgRes>>(
          "/profile/profile-picture",
          payload
        );
        return res.data.data;
      },
      onSuccess: (data) => {
        const newUrl = data.img_url.split("-")[1];
        dispatch(setProfileImage(`${data.img_url}?v=${newUrl}`));
      },
    })
  );

  return res;
}
