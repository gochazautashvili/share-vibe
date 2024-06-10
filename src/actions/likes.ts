"use server";
import getSession from "@/data/getSession";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const LikePost = async (postId: string) => {
  const session = await getSession();

  if (!session?.user.id) return { error: "You Are Not Authorized" };

  try {
    const likes = await db.like.findFirst({
      where: {
        postId: postId,
        userId: session.user.id,
      },
      select: {
        userId: true,
      },
    });

    if (likes?.userId === session.user.id) {
      await db.post.update({
        where: { id: postId },
        data: {
          likeQuantity: {
            decrement: 1,
          },
          like: {
            deleteMany: {
              postId: postId,
              userId: session.user.id,
            },
          },
        },
      });

      revalidatePath("/");
      return { success: "Dislike" };
    }

    await db.post.update({
      where: { id: postId },
      data: {
        likeQuantity: {
          increment: 1,
        },
        like: {
          create: {
            userId: session.user.id,
          },
        },
      },
    });

    revalidatePath("/");
    return { success: "Like" };
  } catch (error) {
    console.log(error);

    return { error: "Something Went Wrong!" };
  }
};
