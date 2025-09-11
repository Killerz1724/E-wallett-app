import z from "zod";

export const transferFormSchema = z.object({
  amount: z
    .number("Amount Required")
    .min(1000, "Minimum transfer amount is 1.000")
    .max(50000000, "Maximum transfer amount is 50.000.000"),
  to: z.object(
    {
      value: z.number(),
      label: z.string(),
      img_url: z.string(),
    },
    "Recipient Required"
  ),
  description: z
    .string()
    .max(35, "Maximum description length is 35 characters")
    .optional(),
});

export type FormTransferValues = z.infer<typeof transferFormSchema>;
