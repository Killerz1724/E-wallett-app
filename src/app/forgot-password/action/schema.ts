import z from "zod";

export const reqResetSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .min(1, "Email Required")
    .max(80, "Maximum email length is 80 characters"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Maximum password length is 100 characters"),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type reqResetType = z.infer<typeof reqResetSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
