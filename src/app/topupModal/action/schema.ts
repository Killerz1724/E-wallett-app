import z from "zod";

export const schemaTopupForm = z.object({
  amount: z
    .number("Amount Required")
    .min(50000, "Minimum topup amount is 50.000")
    .max(10000000, "Maximum topup amount is 10.000.000"),
  source_of_fund: z.number("Source of fund Required"),
});

export type TopUpForm = z.infer<typeof schemaTopupForm>;
