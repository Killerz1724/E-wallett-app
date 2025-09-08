import { COMMON_ERROR } from "constant/common";
import { api } from "lib/axios";
import { ApiResponse } from "types/api";

type reqResetRes = {
  token: string;
};

export async function RequestReset(_: reqResetRes, formData: FormData) {
  const reqBody = {
    email: formData.get("email"),
  };
  try {
    const res = await api.post<ApiResponse<reqResetRes>>(
      "/auth/request-reset",
      reqBody
    );

    return res.data.data;
  } catch {
    return { token: "" };
  }
}

export async function ResetPassword(
  _: { state: boolean; message: string },
  formData: FormData
) {
  const token = formData.get("token");
  const reqBody = {
    new_password: formData.get("password"),
  };
  try {
    await api.post<ApiResponse<reqResetRes>>(
      `/auth/reset-password?tkn=${token}`,
      reqBody
    );

    return { state: true, message: "Success" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const msg = err.response ? err.response.data.message : COMMON_ERROR;
    return { state: false, message: msg };
  }
}
