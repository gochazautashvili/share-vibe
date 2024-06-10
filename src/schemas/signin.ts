import { z } from "zod";

export const SignInSchema = z
  .object({
    email: z.string().email({ message: "Email Is Required Felid!" }),
    password: z
      .string()
      .min(6, { message: "minimum length 6 max 60" })
      .max(60, { message: "minimum length 6 max 60" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
