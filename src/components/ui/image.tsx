import { ImageProps } from "next/image";
import { Image as ImageComponent } from "@/components/ui/image";

export const Image = ({ alt, height, src, width }: ImageProps) => (
	<ImageComponent src={src} alt={alt} width={width} height={height} />
);
