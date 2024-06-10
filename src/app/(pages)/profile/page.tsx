import { getUserPosts } from "@/data/getPost";
import { UserPostType } from "@/types/types";
import dynamicImport from "next/dynamic";
const Card = dynamicImport(() => import("./components/Card"), {
  ssr: false,
  loading: () => (
    <div className="max-w-[300px] h-[170px] bg-slate-400 rounded-md"></div>
  ),
});

export const dynamic = "force-static";

const ProfilePage = async () => {
  const posts: UserPostType[] = await getUserPosts();

  if (posts.length < 1) {
    return (
      <div className="w-full h-full flex items-center justify-center text-center text-xl">
        <h1>You Have Not Posts Or Reels!</h1>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 2 2xl:grid-cols-3 place-items-center gap-x-5 gap-y-10">
      {posts.map((post) => {
        return (
          <Card
            id={post.id}
            description={post.description}
            title={post.title}
            image={post?.image}
            video={post?.video}
            type={post.type}
            key={post.id}
          />
        );
      })}
    </section>
  );
};

export default ProfilePage;
