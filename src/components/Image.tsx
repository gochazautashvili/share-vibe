import { ImageType } from "@/types/types";
import { CldImage } from "next-cloudinary";

const Image = ({ public_id, width, height, alt }: ImageType) => {
  return <CldImage src={public_id} width={width} height={height} alt={alt} />;
};

export default Image;
