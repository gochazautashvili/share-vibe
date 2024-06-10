const Video = ({ src }: { src: string }) => {
  return (
    <video
      className="w-full h-auto rounded-md aspect-video"
      aria-label="Video player"
      width={700}
      height={700}
      controls
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default Video;
