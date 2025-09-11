"use server";
import { cookies } from "next/headers";
import { JWT_TOKEN_KEY } from "../constant/common";

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(JWT_TOKEN_KEY)?.value;
};

export const setToken = async (token: string) => {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    (await cookies()).set(JWT_TOKEN_KEY, token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure only in prod
      sameSite: "lax",
      expires: expiryDate,
      priority: "high",
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to set cookie:", error);
    return { success: false, error };
  }
};

export const removeToken = async () => {
  (await cookies()).delete(JWT_TOKEN_KEY);
};
