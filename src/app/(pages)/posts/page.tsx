import PostComp from "@/components/PostComp";
import { getPosts } from "@/data/getPost";
import { PostTypeT } from "@/types/types";

const PostsPage = async () => {
  const posts: PostTypeT[] = await getPosts();

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
            User={post.User}
            likeQuantity={post.likeQuantity}
          />
        );
      })}
    </section>
  );
};

export default PostsPage;
