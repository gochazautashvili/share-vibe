"use server";

import getSession from "@/data/getSession";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeletePostById = async (id: string) => {
  const session = await getSession();

  if (!session?.user) return { error: "User Is Invalid" };

  try {
    await db.post.delete({
      where: { id },
    });

    revalidatePath("/profile");
    return { success: "Post Is Deleted!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

export const UpdatePostById = async (
  title: string,
  description: string,
  id: string
) => {
  if (!title || !description || !id) return { error: "All Fields!" };

  try {
    await db.post.update({
      where: { id },
      data: { title, description },
    });

    revalidatePath("/profile");
    return { success: "Post Updated" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
