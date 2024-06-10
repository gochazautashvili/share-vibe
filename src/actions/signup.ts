"use server";
import db from "@/lib/db";
import { SignUpSchema } from "@/schemas/signup";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validData = SignUpSchema.safeParse(data);

  if (!validData.success) return { error: "Invalid User Data!" };

  const { email, public_Id, username, password } = validData.data;

  const existUser = await db.user.findUnique({
    where: { email },
  });

  if (existUser) return { error: "User Already Exist!" };

  const hashPassword = await bcryptjs.hash(password, 10);

  try {
    await db.user.create({
      data: {
        email,
        image_id: public_Id,
        username,
        password: hashPassword,
      },
    });

    return { success: "You Are Sign Up Successfully!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
