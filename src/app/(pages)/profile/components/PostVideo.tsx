"use client";

import { useEffect, useRef, useState } from "react";

const PostVideo = ({ src, title }: { src: string; title: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setIsUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const handleVideoEnter = () => {
    if (isUserInteracted) {
      videoRef.current?.play();
    }
  };

  const handleVideoLeave = () => {
    if (isUserInteracted) {
      videoRef.current?.pause();
    }
  };
  return (
    <div
      className="w-full md:w-[300px]"
      onMouseEnter={handleVideoEnter}
      onMouseLeave={handleVideoLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-auto md:h-[170px] rounded-md"
        aria-label="Video player"
        width={400}
        height={300}
      >
        <source src={src} type="video/mp4" />
      </video>
      <h1 className="font-base text-white opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70 hover:opacity-100 transition-opacity duration-300">
        {title}
      </h1>
    </div>
  );
};

export default PostVideo;
