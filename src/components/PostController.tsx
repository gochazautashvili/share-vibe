"use client";
import { PostTypeUser } from "@/types/types";
import { Button } from "./ui/button";
import { FcLike } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikePost } from "@/actions/likes";
import { useOptimistic, useTransition } from "react";

const PostController = ({
  id,
  user,
  liked,
  likeQuantity,
}: {
  id: string;
  liked: boolean;
  likeQuantity: number;
  user: PostTypeUser | null;
}) => {
  const [isLiking, startLiking] = useTransition();
  const [optimisticLike, addOptimistic] = useOptimistic(
    likeQuantity,
    (state: number, action: number) => {
      if (liked) {
        return state - action;
      } else {
        return state + action;
      }
    }
  );
  const [optimisticLiked, addOptimisticLiked] = useOptimistic(
    liked,
    (state: boolean, action) => {
      return (state = !action);
    }
  );

  const imageUrl = `https://res.cloudinary.com/dxesljzkl/image/upload/w_60,h_60,c_fill/v1716907004/${user?.image_id}.png`;

  const likePost = async () => {
    startLiking(() => {
      addOptimisticLiked(liked);
      addOptimistic(1);
    });

    await LikePost(id);
  };

  return (
    <div className="flex items-center justify-between gap-x-5 px-5 h-16 w-full bg-slate-100 dark:bg-blue-300 bg-opacity-70">
      <div className="flex items-center gap-x-3">
        <Avatar>
          <AvatarImage
            width={40}
            height={40}
            src={user?.image_id ? imageUrl : "/user-button-image.png"}
          />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
        <p className="text-base font-semibold">{user?.username}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <Button
          disabled={isLiking}
          onClick={likePost}
          className="flex gap-x-3 px-3 h-10 dark:bg-black-100"
        >
          <FcLike
            size={26}
            fillOpacity={optimisticLiked ? 10 : 0}
            strokeWidth={5}
            stroke={optimisticLiked ? "red" : "white"}
          />
          <span className="text-base font-medium dark:text-white">
            {optimisticLike}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PostController;
