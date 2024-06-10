"use client";
import { CreatePost } from "@/actions/createPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostSchema } from "@/schemas/Posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const CreatePostsPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof PostSchema>) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      startTransition(() => {
        CreatePost(formData).then((res) => {
          if (res.error) toast.error(res.error);
          if (res.success) {
            toast.success(res.success);
            reset();
          }
        });
      });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div>
          <Label
            htmlFor="title"
            className="font-semibold tracking-[1.3px] uppercase"
          >
            Post Title:{" "}
            {errors.title && (
              <span className="text-red-500 font-medium">
                {errors.title.message}
              </span>
            )}
          </Label>
          <Input
            disabled={isPending}
            id="title"
            placeholder="Title..."
            {...register("title")}
          />
        </div>
        <div>
          <Label
            htmlFor="desc"
            className="font-semibold tracking-[1.3px] uppercase"
          >
            Post Description:{" "}
            {errors.description && (
              <span className="text-red-500 font-medium">
                {errors.description.message}
              </span>
            )}
          </Label>
          <Textarea
            disabled={isPending}
            id="desc"
            placeholder="Content..."
            {...register("description")}
          />
        </div>
        <div>
          <Label
            htmlFor="image"
            className="font-semibold tracking-[1.3px] uppercase"
          >
            Post Image:{" "}
            {errors.file && (
              <span className="text-red-500 font-medium">
                {`${errors.file.message}`}
              </span>
            )}
          </Label>
          <Input
            disabled={isPending}
            accept="image/*"
            multiple={false}
            id="image"
            type="file"
            placeholder="Title..."
            {...register("file")}
          />
        </div>
        <Button disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Create Post"}
        </Button>
      </form>
    </>
  );
};

export default CreatePostsPage;
