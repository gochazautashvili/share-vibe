"use client";
import { UserPostType } from "@/types/types";
import PostImage from "./PostImage";
import dynamic from "next/dynamic";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { DeletePostById, UpdatePostById } from "@/actions/userPostsActions";
import { toast } from "react-toastify";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const PostVideo = dynamic(() => import("./PostVideo"), {
  ssr: false,
  loading: () => (
    <div className="w-[327px] h-[173px] bg-slate-400 rounded-md"></div>
  ),
});

const Card = ({ title, image, video, type, id, description }: UserPostType) => {
  const [isDeleting, startDeleting] = useTransition();
  const [isUpdating, startUpdating] = useTransition();
  const [updateTitle, setUpdateTitle] = useState<string>(title);
  const [updateDesc, setUpdateDesc] = useState<string>(description);

  const handleDeleteUserPost = async () => {
    startDeleting(() => {
      DeletePostById(id).then((res) => {
        if (res.error) toast.error(res.error);
        if (res.success) toast.success(res.success);
      });
    });
  };

  return (
    <div className="border border-black-100 rounded-md relative w-full md:w-auto">
      <div>
        <Button
          disabled={isDeleting}
          onClick={handleDeleteUserPost}
          className="absolute cursor-pointer top-3 right-3 z-20 w-8 h-8 p-2 border border-black-100"
          type="button"
          title="delete"
        >
          <RiDeleteBin2Fill size={25} />
        </Button>
        <Dialog>
          <DialogTrigger className="absolute cursor-pointer top-3 left-3 z-20 bg-black-100 px-3 rounded py-1 text-white">
            Update
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="uppercase tracking-[1.8px]">
                Update Your {type}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                startUpdating(() => {
                  UpdatePostById(updateTitle, updateDesc, id).then((res) => {
                    if (res.error) toast.error(res.error);
                    if (res.success) toast.success(res.success);
                  });
                });
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="title">UPDATE {type} TITLE:</Label>
                <Input
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  id="title"
                  placeholder="title..."
                  value={updateTitle}
                />
              </div>
              <div>
                <Label htmlFor="desc">UPDATE {type} DESCRIPTION:</Label>
                <Input
                  onChange={(e) => setUpdateDesc(e.target.value)}
                  id="desc"
                  placeholder="description..."
                  value={updateDesc}
                />
              </div>
              <DialogFooter>
                <Button className="uppercase" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : `update ${type}`}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {type === "POST" && !!image && (
        <PostImage url={image.url} title={title} />
      )}
      {type === "REEL" && !!video && (
        <PostVideo src={video.url} title={title} />
      )}
      {isDeleting && (
        <h1 className="font-base text-white opacity-0 absolute top-0 left-0 right-0 bottom-0 flex z-10 items-center justify-center bg-black bg-opacity-70 hover:opacity-100 transition-opacity duration-300">
          Post Is Deleting...
        </h1>
      )}
    </div>
  );
};

export default Card;
