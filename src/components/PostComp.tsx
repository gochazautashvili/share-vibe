import dynamic from "next/dynamic";
import PostImage from "./PostImage";
import Video from "./Video";
import { PostType } from "@/types/types";
import { getLikes } from "@/data/getLikes";
import getSession from "@/data/getSession";
const PostController = dynamic(() => import("@/components/PostController"), {
  ssr: false,
  loading: () => <div className="w-full h-16 bg-gray-300 animate-pulse"></div>,
});

const PostComp = async ({
  id,
  title,
  description,
  type,
  image,
  video,
  User,
  likeQuantity,
}: PostType) => {
  const likes = await getLikes(id);
  const session = await getSession();

  const liked = likes?.userId === session?.user.id;

  return (
    <div className="w-full max-w-[700px] border-2 border-black-100 dark:border-blue-300 rounded-md overflow-hidden">
      <div className="border-b-2 border-black dark:border-blue-300 rounded-md">
        {type === "POST" && !!image && <PostImage src={image.url} />}
        {type === "REEL" && !!video && <Video src={video?.url} />}
      </div>
      <div className="mt-4 text-black dark:text-white px-4 pb-6">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="mt-2">{description}</p>
      </div>
      <PostController
        id={id}
        user={User}
        liked={liked}
        likeQuantity={likeQuantity}
      />
    </div>
  );
};

export default PostComp;
