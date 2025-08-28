"use server";
import { cookies } from "next/headers";
import { JWT_TOKEN_KEY } from "../constant/common";

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(JWT_TOKEN_KEY)?.value;
};

export const setToken = async (token: string) => {
  const expiryDate = new Date(new Date().setDate(new Date().getDate() + 3));
  (await cookies()).set(JWT_TOKEN_KEY, token, {
    path: "/",
    httpOnly: true,
    secure: true,
    expires: expiryDate,
  });
};

export const removeToken = async () => {
  (await cookies()).delete(JWT_TOKEN_KEY);
};
