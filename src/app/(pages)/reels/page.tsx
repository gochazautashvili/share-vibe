import PostComp from "@/components/PostComp";
import { getReels } from "@/data/getPost";
import { ReelTypeT } from "@/types/types";

const ReelsPage = async () => {
  const posts: ReelTypeT[] = await getReels();

  if (posts.length < 1) {
    return (
      <h1 className="py-10 text-center text-2xl text-black font-semibold">
        There Is Reels You Can Add
      </h1>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-10 py-10">
      {posts.map((post) => {
        return (
          <PostComp
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            type={post.type}
            video={post?.video}
            User={post.User}
            likeQuantity={post.likeQuantity}
          />
        );
      })}
    </section>
  );
};

export default ReelsPage;
