import { z } from "zod";
const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const PostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  file: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
});
