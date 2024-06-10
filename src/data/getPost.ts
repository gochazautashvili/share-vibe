"use server";
import db from "@/lib/db";
import getSession from "./getSession";
import { PostType, PostTypeT, ReelTypeT } from "@/types/types";

export const getUserPosts = async () => {
  const session = await getSession();

  const posts = db.post.findMany({
    where: { userId: session?.user.id },
    select: {
      title: true,
      description: true,
      id: true,
      type: true,
      image: {
        select: {
          url: true,
        },
      },
      video: {
        select: {
          url: true,
        },
      },
    },
  });

  return posts;
};

export const getAllPost = async () => {
  const posts: PostType[] = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      likeQuantity: true,
      image: {
        select: {
          url: true,
        },
      },
      video: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          username: true,
          image_id: true,
        },
      },
      like: {
        select: {
          userId: true,
        },
      },
    },
    take: 10,
  });

  return posts;
};

export const getPosts = async () => {
  const posts: PostTypeT[] = await db.post.findMany({
    where: { type: "POST" },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      likeQuantity: true,
      image: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          username: true,
          image_id: true,
        },
      },
    },
    take: 10,
  });

  return posts;
};

export const getReels = async () => {
  const posts: ReelTypeT[] = await db.post.findMany({
    where: { type: "REEL" },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      likeQuantity: true,
      video: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          username: true,
          image_id: true,
        },
      },
    },
    take: 10,
  });

  return posts;
};
