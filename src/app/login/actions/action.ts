"use server";

import { COMMON_ERROR } from "constant/common";
import { api } from "lib/axios";
import { setToken } from "lib/cookies";
import { ApiResponse } from "types/api";
import { da } from "zod/v4/locales";

type LoginResponse = {
  access_token: string;
};

export type UserResponses = {
  img_url: string;
  username: string;
  email: string;
  balance: number;
};

export async function Login(
  _: { success: boolean; message: string },
  formData: FormData
) {
  const reqBody = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const res = await api.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      reqBody
    );
    setToken(res.data.data.access_token);
    return { success: true, message: "success" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response ? error.response.data.message : COMMON_ERROR;
    return { success: false, message: message };
  }
}
