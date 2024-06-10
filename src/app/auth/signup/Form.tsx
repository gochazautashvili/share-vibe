"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CldUploadWidget } from "next-cloudinary";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schemas/signup";
import { signUp } from "@/actions/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Form = () => {
  const [public_Id, setPublic_Id] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSignUp = (data: z.infer<typeof SignUpSchema>) => {
    if (!public_Id) toast.error("Profile Picture Is Required Field!");

    startTransition(() => {
      signUp(data).then((res) => {
        if (res?.error) toast.error(res.error);
        if (res.success) {
          toast.success(res.success);
          router.push("/auth/signin");
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSignUp)}
      className="w-full max-w-[600px] flex flex-col gap-3 mx-6"
    >
      <h1 className="text-xl font-semibold text-center uppercase pb-3 border-b-2 border-black dark:border-white mb-4">
        Sign Up
      </h1>
      <div className="flex flex-col gap-1">
        <Label htmlFor="username">
          Username:{" "}
          {errors.username && (
            <span className="text-red-500">{errors?.username.message}</span>
          )}
        </Label>
        <Input
          id="username"
          className="border-black border-2 dark:border-white"
          placeholder="username"
          {...register("username")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">
          Email:{" "}
          {errors.email && (
            <span className="text-red-500">{errors?.email.message}</span>
          )}
        </Label>
        <Input
          id="email"
          className="border-black border-2 dark:border-white"
          placeholder="share@example.com"
          type="email"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">
          Password:{" "}
          {errors.password && (
            <span className="text-red-500">{errors?.password.message}</span>
          )}
        </Label>
        <Input
          id="password"
          className="border-black border-2 dark:border-white"
          placeholder="********"
          type="password"
          {...register("password")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="CPassword">
          Confirm Password:{" "}
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors?.confirmPassword.message}
            </span>
          )}
        </Label>
        <Input
          id="CPassword"
          className="border-black border-2 dark:border-white"
          placeholder="********"
          type="password"
          {...register("confirmPassword")}
        />
      </div>
      <CldUploadWidget
        options={{
          maxFileSize: 2000000,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string}
        onSuccess={(result: any, { widget }) => {
          setPublic_Id(result.info.public_id);
          setValue("public_Id", result.info.public_id);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <button
              disabled={!!public_Id}
              className={cn(
                "text-sm font-medium uppercase tracking-[1.3px] w-full h-10 bg-gray-800 dark:bg-gray-200 dark:text-black text-white rounded-md",
                public_Id && "bg-green-600 dark:bg-green-600"
              )}
              type="button"
              onClick={() => open()}
            >
              {public_Id
                ? "Picture Upload Successfully"
                : "Upload Portfolio Picture"}
            </button>
          );
        }}
      </CldUploadWidget>
      <p className="tracking-[1.2] dark:text-gray-100 text-gray-900">
        IF YOU ALREADY HAVE ACCOUNT -{" "}
        <Link className="underline text-gray-400" href="/auth/signin">
          SIGN IN
        </Link>{" "}
      </p>
      <Button
        disabled={!public_Id || isPending}
        className="uppercase mt-3"
        type="submit"
      >
        {isPending ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Form;
