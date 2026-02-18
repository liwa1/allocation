"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectRatio?: "video" | "square";
  className?: string;
}

export default function ImageCarousel({
  images,
  alt,
  aspectRatio = "video",
  className = "",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  if (!images.length) {
    return (
      <div
        className={`bg-[#DDE3EA] flex items-center justify-center ${
          aspectRatio === "square" ? "aspect-square" : "aspect-video"
        } ${className}`}
      >
        <span className="text-[#1A2517]/40 text-sm">No images</span>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden rounded-2xl ${className}`}>
      <div
        className={`relative ${
          aspectRatio === "square" ? "aspect-square" : "aspect-video"
        }`}
      >
        <Image
          src={images[current]}
          alt={`${alt} - ${current + 1}`}
          fill
          className="object-cover transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4 text-[#1A2517]" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronRight className="w-4 h-4 text-[#1A2517]" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
