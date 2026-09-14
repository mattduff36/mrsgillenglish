import Image, { type ImageProps } from "next/image";
import { isAllowedImageRef } from "@/lib/content/images";

type ContentImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
  fallbackSrc?: string;
};

export function ContentImage({
  src,
  fallbackSrc,
  alt,
  unoptimized,
  ...props
}: ContentImageProps) {
  const resolved = src && isAllowedImageRef(src) ? src : fallbackSrc;
  if (!resolved || !isAllowedImageRef(resolved)) return null;
  const remote = resolved.startsWith("https://");

  return (
    <Image
      src={resolved}
      alt={alt}
      unoptimized={remote || unoptimized}
      {...props}
    />
  );
}
