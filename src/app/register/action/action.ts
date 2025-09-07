"use server";

import { COMMON_ERROR } from "constant/common";
import { api } from "lib/axios";

export async function Register(
  _: { success: boolean; message: string },
  body: FormData
) {
  const reqBody = {
    username: body.get("username") as string,
    email: body.get("email") as string,
    password: body.get("password") as string,
  };

  try {
    await api.post("/auth/register", reqBody);
    return { success: true, message: "success" };
  } catch (error) {
    const message = error.response ? error.response.data.message : COMMON_ERROR;
    return { success: false, message: message };
  }
}
