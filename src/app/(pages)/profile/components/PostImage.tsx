import Image from "next/image";

const PostImage = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="w-full md:w-[300px]">
      <Image
        className="object-cover w-full h-auto md:h-[170px] rounded-md bg-slate-400"
        src={url}
        width={400}
        height={300}
        sizes="(min-width: 808px) 50vw, 100vw"
        alt="profile post image"
        quality={100}
        loading="eager"
        priority
      />
      <h1 className="font-base text-white opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70 hover:opacity-100 transition-opacity duration-300">
        {title}
      </h1>
    </div>
  );
};

export default PostImage;
