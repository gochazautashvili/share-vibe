import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "./schemas/signin";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";
import credentials from "next-auth/providers/credentials";

export default {
  providers: [
    credentials({
      authorize: async (credentials) => {
        const validCredentials = SignInSchema.safeParse(credentials);

        if (!validCredentials.success) return null;

        const { email, password } = validCredentials.data;

        if (!email || !password) return null;

        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const validPassword = await bcrypt.compare(password, user?.password);

        if (!validPassword) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
