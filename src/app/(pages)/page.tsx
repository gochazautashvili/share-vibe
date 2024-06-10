import PostComp from "@/components/PostComp";
import { getAllPost } from "@/data/getPost";
import { PostType } from "@/types/types";

const Home = async () => {
  const posts: PostType[] = await getAllPost();

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
            image={post?.image}
            video={post?.video}
            User={post.User}
            likeQuantity={post.likeQuantity}
          />
        );
      })}
    </section>
  );
};

export default Home;
