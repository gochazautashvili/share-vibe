"use server";

import db from "@/lib/db";

export const getLikes = async (postId: string) => {
  const likes = await db.like.findUnique({
    where: { postId },
    select: {
      userId: true,
    },
  });

  return likes;
};
