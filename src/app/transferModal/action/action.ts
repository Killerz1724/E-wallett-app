"use server";

import { api } from "lib/axios";
import { COMMON_ERROR } from "constant/common";
import { ConvertCurrencytoNumeric } from "utils/convertCurrencytoNumeric";

export async function Transfer(
  _: { success: boolean; message: string },
  formData: FormData
) {
  const reqBody = {
    amount: ConvertCurrencytoNumeric(formData.get("amount") as string),
    to: Number(formData.get("to")),
  };

  try {
    await api.post("/users/transactions/transfer", reqBody);
    return { success: true, message: "success" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response ? error.response.data.message : COMMON_ERROR;
    return { success: false, message: message };
  }
}
