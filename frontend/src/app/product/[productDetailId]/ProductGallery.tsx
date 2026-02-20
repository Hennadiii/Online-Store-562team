"use client";

import { useState } from "react";
import Image from "next/image";
import Thumbnail from "./Thumbnail";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-[600px] aspect-square bg-gray-100 mx-auto">
        <Image
          src={images[activeIndex]}
          alt="Product image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
