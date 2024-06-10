import Image from "next/image";

const PostImage = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="img"
      width={700}
      height={700}
      loading="eager"
      priority
      className="w-full h-auto bg-slate-400 rounded-md"
    />
  );
};

export default PostImage;
