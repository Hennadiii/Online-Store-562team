"use client";

import Image from "next/image";
import clsx from "clsx";

interface ThumbnailProps {
  src: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Thumbnail({
  src,
  isActive,
  onClick,
}: ThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative w-20 h-20 shrink-0 border transition-all duration-200",
        isActive
          ? "border-black"
          : "border-transparent hover:border-gray-400"
      )}
    >
      <Image
        src={src}
        alt="Thumbnail"
        fill
        sizes="80px"
        className="object-cover"
      />
    </button>
  );
}
