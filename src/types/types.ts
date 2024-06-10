import { Type } from "@prisma/client";

export type ImageType = {
  public_id: string;
  alt: string;
  width: number;
  height: number;
};

export type UserImageType = {
  url: string;
};

export type UserVideoType = {
  url: string;
};

export type PostTypeUser = {
  username: string;
  image_id: string;
};

export type UserPostType = {
  title: string;
  description: string;
  id: string;
  type: Type;
  image: UserImageType | null;
  video: UserVideoType | null;
};

type LikeType = {
  userId: string | null;
}[];

export type PostType = {
  id: string;
  title: string;
  description: string;
  type: Type;
  likeQuantity: number;
  like?: LikeType | null;
  image?: UserImageType | null;
  video?: UserVideoType | null;
  User: PostTypeUser | null;
};

export type PostTypeT = {
  id: string;
  title: string;
  description: string;
  type: Type;
  likeQuantity: number;
  image: UserImageType | null;
  User: PostTypeUser | null;
};

export type ReelTypeT = {
  id: string;
  title: string;
  description: string;
  likeQuantity: number;
  type: Type;
  video: UserVideoType | null;
  User: PostTypeUser | null;
};
