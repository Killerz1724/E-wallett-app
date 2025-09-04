"use server";
import { COMMON_ERROR } from "constant/common";
import { api } from "lib/axios";
import { ConvertCurrencytoNumeric } from "utils/convertCurrencytoNumeric";

export async function TopUp(
  _: { success: boolean; message: string },
  formData: FormData
) {
  const body = {
    amount: ConvertCurrencytoNumeric(formData.get("amount") as string),
    source_of_fund: Number(formData.get("source_of_fund")),
  };

  try {
    await api.post("/users/transactions/top-up", body);
    return { success: true, message: "success" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response ? error.response.data.message : COMMON_ERROR;
    return { success: false, message: message };
  }
}
