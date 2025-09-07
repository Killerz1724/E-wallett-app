import z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username Required")
    .max(40, "Maximum username length is 40 characters"),
  email: z
    .email("Please enter a valid email")
    .min(1, "Email Required")
    .max(80, "Maximum email length is 80 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Maximum password length is 100 characters"),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
