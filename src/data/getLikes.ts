"use server";
import db from "@/lib/db";
import getSession from "./getSession";

export const getLikes = async (postId: string) => {
  const session = await getSession();
  const likes = await db.like.findFirst({
    where: { postId, userId: session?.user.id },
    select: {
      userId: true,
    },
  });

  return likes;
};
