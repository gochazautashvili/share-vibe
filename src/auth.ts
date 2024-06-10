import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import db from "./lib/db";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.image_id = token.image_id;
      session.user.username = token.username;
      session.user.id = token.id as string;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.image_id = existingUser.image_id;
      token.username = existingUser.username;
      token.id = existingUser.id;

      return token;
    },
  },
  ...authConfig,
});
