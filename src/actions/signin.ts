"use server";
import { getUserByEmail } from "@/data/user";
import { SignInSchema } from "@/schemas/signin";
import { signIn } from "@/auth";
import { z } from "zod";
import { AuthError } from "next-auth";
import { HOME_PAGE_URL } from "@/routes";
import { revalidatePath } from "next/cache";

export const login = async (data: z.infer<typeof SignInSchema>) => {
  const formData = SignInSchema.safeParse(data);

  if (!formData.success) return { error: "Invalid User Data!" };

  const { email, password, confirmPassword } = formData.data;

  const user = getUserByEmail(email);

  if (!user) return { error: "User Does Not Exist!" };

  try {
    await signIn("credentials", {
      email,
      password,
      confirmPassword,
      redirectTo: HOME_PAGE_URL,
    });

    window.location.reload();
    revalidatePath("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Error - Try again!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
