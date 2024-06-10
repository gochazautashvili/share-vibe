"use server";
import getSession from "@/data/getSession";
import db from "@/lib/db";
import { uploadImage, uploadVideo } from "@/lib/uploader";
import { revalidatePath } from "next/cache";

export const CreatePost = async (formData: FormData) => {
  const fileImage = formData.get("image");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!fileImage || !title || !description) {
    return { error: "Invalid FormData!" };
  }

  const image = await uploadImage(fileImage);

  if (!image) return { error: "Invalid Image Try Again!" };

  try {
    const session = await getSession();

    if (!session?.user) return { error: "Invalid Auth" };

    await db.post.create({
      data: {
        title,
        description,
        userId: session?.user.id,
        type: "POST",
        image: {
          create: {
            asset_id: image.asset_id,
            public_id: image.public_id,
            version: image.version,
            version_id: image.version_id,
            signature: image.signature,
            width: image.width,
            height: image.height,
            format: image.format,
            resource_type: image.resource_type,
            created_at: image.created_at,
            url: image.url,
            secure_url: image.secure_url,
            original_filename: image.original_filename,
          },
        },
      },
    });

    revalidatePath("/profile");
    return { success: "The post was created successfully :)" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

export const CreateReel = async (formData: FormData) => {
  const fileVideo = formData.get("video");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!fileVideo || !title || !description) {
    return { error: "Invalid FormData!" };
  }

  const video = await uploadVideo(fileVideo);

  console.log(video);

  if (!video) return { error: "Invalid Video Try Again!" };

  try {
    const session = await getSession();

    if (!session?.user) return { error: "Invalid Auth" };

    await db.post.create({
      data: {
        title,
        description,
        userId: session?.user.id,
        type: "REEL",
        video: {
          create: {
            asset_id: video.asset_id,
            public_id: video.public_id,
            version_id: video.version_id,
            signature: video.signature,
            width: video.width,
            height: video.height,
            format: video.format,
            url: video.url,
            secure_url: video.secure_url,
            playback_url: video.playback_url,
            duration: video.duration,
            original_filename: video.original_filename,
          },
        },
      },
    });

    revalidatePath("/profile");
    return { success: "The reel was created successfully :)" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};
