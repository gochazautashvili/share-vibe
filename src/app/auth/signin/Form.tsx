"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schemas/signin";
import { z } from "zod";
import Link from "next/link";
import { login } from "@/actions/signin";
import { toast } from "react-toastify";
import { useTransition } from "react";

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSignIn = (data: z.infer<typeof SignInSchema>) => {
    startTransition(() => {
      login(data)
        .then((res) => {
          if (res?.error) toast.error(res?.error);
        })
        .catch(() => {
          toast.error("Something Went Wrong!");
        });
    });
  };

  const DemoSigIn = () => {
    const data = {
      email: "tester@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    };

    startTransition(() => {
      login(data)
        .then((res) => {
          if (res?.error) toast.error(res?.error);
        })
        .catch(() => {
          toast.error("Something Went Wrong!");
        });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSignIn)}
      className="w-full max-w-[600px] flex flex-col gap-3 mx-6"
    >
      <h1 className="text-xl font-semibold text-center uppercase pb-3 border-b-2 border-black dark:border-white mb-4">
        Sign In
      </h1>
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
      <p className="tracking-[1.2] dark:text-gray-100 text-gray-900">
        IF YOU HAVE NOT ACCOUNT -{" "}
        <Link className="underline text-gray-400" href="/auth/signup">
          SIGN UP
        </Link>{" "}
      </p>
      <Button disabled={isPending} className="uppercase mt-3" type="submit">
        {isPending ? "Loading..." : "Sign In"}
      </Button>
      <Button
        onClick={DemoSigIn}
        disabled={isPending}
        className="uppercase mt-3"
        type="button"
      >
        {isPending ? "Loading..." : "Sign In Demo User"}
      </Button>
    </form>
  );
};

export default Form;
